# Muse retest — strict API request modes

Read `docs/STATUS.md` and verify the current Git commit before testing.
Preserve the untracked `package-lock.json` on your Muse VM; do not hard reset.

## Build

1. `git status --short` and `git pull --ff-only` (only if safe).
2. `npm install`, `npm run typecheck`, `npm test`, `npm run build`.
3. Restart the Node API process to load the new `server/index.ts`.
4. Start the Vite web process and use the same-VM Chromium browser.

## API acceptance (use POST /api/tasks with valid title and agentId)

- `{"mode":"DEMO","title":"Mode regression","agentId":"agent-1"}` → 201; task is marked DEMO and eventually has a **simulated** artifact.
- `{"mode":"LIVE","title":"Mode regression","agentId":"agent-1"}` → 501, `INTEGRATION_REQUIRED`, no demo task created.
- The same request with `"mode":"live"` or `"mode":"demo"` → 400, `INVALID_MODE`, no task created.
- Missing mode, `null`, `"Live"`, whitespace or random values → 400 `INVALID_MODE`; no task created.
- A JSON array, `null`, or scalar request body → 400 `VALIDATION_ERROR`; no task created.
- Compare task count before/after invalid requests, not just response codes.
- Check SSE for genuine demo transitions; rejected requests must not emit task-created events.

## UI and scene smoke

Verify dev and production preview still render visible WebGL geometry
(draw calls >0) and that Tasks, camera presets, roof, pause, and avatar
selection work on repeated real mouse clicks. Verify demo UI submission
still produces an explicitly simulated artifact.

Report PASS / FAIL / NOT TESTED with HTTP status, response codes, screenshots,
test totals, and commit SHA. Do not deploy, publish or claim live AI execution.
