/**
 * Request mode is an explicit capability boundary. Invalid, misspelled, or
 * differently-cased values must NEVER silently fall through to demo execution.
 */
export type TaskMode = 'DEMO' | 'LIVE';

export function parseTaskMode(value: unknown): TaskMode | null {
  return value === 'DEMO' || value === 'LIVE' ? value : null;
}
