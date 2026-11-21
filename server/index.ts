import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { TaskStore, type DemoTask } from './store.js';
import { parseTaskMode } from './task-mode.js';

const appDir = dirname(dirname(fileURLToPath(import.meta.url)));
const store = new TaskStore(join(appDir, 'data', 'tasks.json'));
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 8787);
const clients = new Set<ServerResponse>();
const json = (res: ServerResponse, code: number, data: unknown) => {
  res.writeHead(code, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
  res.end(JSON.stringify(data));
};
const announce = (task: DemoTask) => {
  const event = `event: task\ndata: ${JSON.stringify(task)}\n\n`;
  for (const res of clients) res.write(event);
};
async function body(req: IncomingMessage): Promise<unknown> {
  let text = '';
  for await (const chunk of req) {
    text += chunk.toString('utf8');
    if (text.length > 10000) throw Error('Payload too large');
  }
  return JSON.parse(text);
}
const server = createServer(async (req, res) => {
  const pathname = new URL(req.url || '/', 'http://localhost').pathname;
  if (req.method === 'GET' && pathname === '/api/health') {
    return json(res, 200, { ok: true, liveExecution: false, mode: 'DEMO', storage: 'local-json-dev-only' });
  }
  if (req.method === 'GET' && pathname === '/api/tasks') return json(res, 200, store.list());
  if (req.method === 'GET' && pathname === '/api/events') {
    res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-cache', connection: 'keep-alive' });
    res.write(': connected\n\n'); clients.add(res);
    req.on('close', () => clients.delete(res)); return;
  }
  if (req.method === 'POST' && pathname === '/api/tasks') {
    try {
      const rawPayload = await body(req);
      if (!rawPayload || typeof rawPayload !== 'object' || Array.isArray(rawPayload)) {
        return json(res, 400, { code: 'VALIDATION_ERROR', message: 'Expected a JSON object.' });
      }
      const payload = rawPayload as Record<string, unknown>;
      const mode = parseTaskMode(payload.mode);
      if (!mode) {
        return json(res, 400, { code: 'INVALID_MODE', message: 'mode must be exactly "DEMO" or "LIVE".' });
      }
      if (mode === 'LIVE') return json(res, 501, { code: 'INTEGRATION_REQUIRED', message: 'Live LLM execution is not implemented. No provider was called.' });
      const title = typeof payload.title === 'string' ? payload.title.trim() : '';
      const agentId = typeof payload.agentId === 'string' ? payload.agentId.trim() : '';
      if (!title || title.length > 200 || !/^agent-(0?[1-9]|10)$/.test(agentId)) {
        return json(res, 400, { code: 'VALIDATION_ERROR', message: 'Provide title (1-200 chars) and valid demo agent ID.' });
      }
      const task = store.create(title, agentId);
      announce(task);
      // DEMO ONLY: these transitions explicitly do not call an LLM or any external tool.
      setTimeout(() => {
        const running = store.transition(task.id, 'running');
        if (running) announce(running);
      }, 600);
      setTimeout(() => {
        const done = store.transition(task.id, 'demo_completed', {
          name: 'DEMO_RESULT.txt',
          content: `Simulated result for: ${title}. This is NOT an LLM-generated artifact.`,
          simulated: true
        });
        if (done) announce(done);
      }, 2500);
      return json(res, 201, task);
    } catch (error) {
      return json(res, 400, { code: 'BAD_REQUEST', message: error instanceof Error ? error.message : 'Invalid body' });
    }
  }
  return json(res, 404, { code: 'NOT_FOUND' });
});
server.listen(port, host, () => console.log(`DEMO API running at http://${host}:${port}`));
