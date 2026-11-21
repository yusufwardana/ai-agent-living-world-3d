# Muse re-test checklist — offline 3D scene and UI controls

Source report: Muse Linux VM / Chromium + SwiftShader, 2026-11-21, starting at commit `76480fc`.

## Update and verify

1. Preserve any local changes (notably the untracked `package-lock.json` reported in the initial Muse run) before pulling. Do **not** force-reset or delete it.
2. `git status --short`, then `git pull --ff-only` from the verified `main` branch if the worktree is clean or the pull can proceed safely.
3. Run `npm install`, `npm run typecheck`, `npm test`, `npm run build` and record full outcomes.
4. Run `npm run dev` and use Chromium **in the same VM** if the separate cloud browser cannot reach `127.0.0.1:5173`.
5. Also test scene rendering in production preview. `npm run preview` may not proxy `/api` by default; do not confuse the demo API badge with 3D rendering success.

## Browser rendering acceptance

- **PASS** only if the canvas visibly shows ground, office, other buildings, pool, and avatars, and WebGL draw calls are **greater than zero** in an observation window after initial mount.
- Take screenshots at initial load and after 2 seconds. Confirm the canvas differs from a uniform `#e6f0f1` background.
- Check `pageerror`, WebGL errors, network requests, and warnings. Confirm labels render without external unicode metadata or Google Fonts HTTP requests.
- If scene still has zero draw calls, capture the first exception/rejected promise and isolate the first `<Canvas>` child, then restore children incrementally. Do not infer cause solely from failed requests.

## UI control acceptance (mouse clicks in real browser, not synthetic handler calls)

- Navigate `Tasks` → confirm `Task Center` and input form appear; return `World Overview`.
- Toggle `Roof` twice → selected state changes twice and roof visually responds.
- Toggle `Pause` → `Resume` → `Pause` and check avatar motion stops and resumes without jumping.
- Toggle `Top` / `Isometric` and confirm camera angle visibly changes.
- Select an agent via roster and via the rendered avatar; check inspector shows the matching agent each time.
- Submit a demo task through the UI, verify `queued → running → demo_completed` and visible `simulated: true` artifact, and confirm LIVE continues to return HTTP 501 `INTEGRATION_REQUIRED`.
- Repeat controls at least three times; a single successful click is insufficient for PASS.

## Report results

Record PASS, FAIL or NOT TESTED separately for dev and preview, including screenshot locations,
WebGL calls/programs, browser console/pageerrors, request failures, environment details, and commit SHA.

**Do not claim production readiness or real AI execution.** This patch addresses one suspected
external-font dependency, not proven root cause of every reported UI issue.
