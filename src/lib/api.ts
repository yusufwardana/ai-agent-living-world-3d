export type DemoStatus = 'queued' | 'running' | 'demo_completed' | 'failed';
export interface DemoTask {
  id: string; title: string; agentId: string; mode: 'DEMO'; status: DemoStatus;
  createdAt: string; updatedAt: string;
  artifact?: { name: string; content: string; simulated: true };
}
export async function getTasks(): Promise<DemoTask[]> {
  const res = await fetch('/api/tasks');
  if (!res.ok) throw new Error('Demo server unavailable');
  return res.json() as Promise<DemoTask[]>;
}
export async function createDemoTask(title: string, agentId: string): Promise<DemoTask> {
  const res = await fetch('/api/tasks', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ mode: 'DEMO', title, agentId }) });
  if (!res.ok) throw new Error((await res.json() as {message?:string}).message || 'Task request failed');
  return res.json() as Promise<DemoTask>;
}
