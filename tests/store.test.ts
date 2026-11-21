import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { TaskStore } from '../server/store.js';

test('demo task persists events and visibly simulated artifact', () => {
  const dir = mkdtempSync(join(tmpdir(), 'living-world-'));
  try {
    const path = join(dir, 'tasks.json');
    const store = new TaskStore(path);
    const task = store.create('Design a website', 'agent-1');
    store.transition(task.id, 'running');
    store.transition(task.id, 'demo_completed', { name: 'DEMO_RESULT.txt', content: 'simulated', simulated: true });
    const saved = JSON.parse(readFileSync(path, 'utf8'));
    assert.equal(saved[0].mode, 'DEMO');
    assert.equal(saved[0].events.length, 3);
    assert.equal(saved[0].artifact.simulated, true);
    assert.equal(new TaskStore(path).list()[0].status, 'demo_completed');
    assert.throws(() => store.transition(task.id, 'running'), /Invalid transition/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
