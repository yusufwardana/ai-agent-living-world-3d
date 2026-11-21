import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

export type TaskStatus = 'queued' | 'running' | 'demo_completed' | 'failed';
export interface TaskEvent { id: string; type: TaskStatus; at: string; }
export interface DemoTask {
  id: string; title: string; agentId: string; mode: 'DEMO';
  status: TaskStatus; createdAt: string; updatedAt: string;
  artifact?: { name: string; content: string; simulated: true };
  events: TaskEvent[];
}
export class TaskStore {
  private tasks: DemoTask[];
  constructor(private path: string) {
    this.tasks = existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) as DemoTask[] : [];
  }
  list() { return [...this.tasks].reverse(); }
  create(title: string, agentId: string): DemoTask {
    const now = new Date().toISOString();
    const task: DemoTask = {
      id: randomUUID(), title, agentId, mode: 'DEMO', status: 'queued',
      createdAt: now, updatedAt: now, events: [{ id: randomUUID(), type: 'queued', at: now }]
    };
    this.tasks.push(task); this.persist(); return task;
  }
  transition(id: string, status: TaskStatus, artifact?: DemoTask['artifact']): DemoTask | undefined {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return undefined;
    const allowed: Record<TaskStatus, TaskStatus[]> = {
      queued: ['running', 'failed'], running: ['demo_completed', 'failed'],
      demo_completed: [], failed: []
    };
    if (!allowed[task.status].includes(status)) throw Error(`Invalid transition: ${task.status} -> ${status}`);
    const at = new Date().toISOString();
    task.status = status; task.updatedAt = at;
    task.events.push({ id: randomUUID(), type: status, at });
    if (artifact) task.artifact = artifact;
    this.persist(); return task;
  }
  private persist() {
    mkdirSync(dirname(this.path), { recursive: true });
    const temp = this.path + '.tmp';
    writeFileSync(temp, JSON.stringify(this.tasks, null, 2), 'utf8');
    renameSync(temp, this.path);
  }
}
