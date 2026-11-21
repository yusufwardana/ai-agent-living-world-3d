# Muse retest — World Engine v2 module boundaries

Repository: https://github.com/yusufwardana/ai-agent-living-world-3d

This is a behavior-preserving 3D scene refactor, NOT a feature-complete World Engine v2.
No backend task/LLM behavior, provider connection, or production deployment is intended.

## Update safely

- Record `git status --short` and `git log -1 --oneline`.
- Preserve the existing untracked `package-lock.json`; do not run
  `git clean`, `git reset --hard`, or destructive cleanup.
- `git pull --ff-only` from main if safe.
- `npm install`, `npm run typecheck`, `npm test`, `npm run build`.
- Restart both Vite and demo API if needed.

## Dev and production browser acceptance

Use Playwright/Chromium in the same VM if the cloud browser cannot reach localhost.
For BOTH Vite dev and `npm run preview`:

1. WebGL 2 works; nonzero draw calls. Screenshot shows ground, HQ with desks,
   Innovation Lab, Lounge, Pool and all 10 named avatars, not a blank canvas.
2. Camera: Top ↔ Isometric repeated 3 times, orbit drag, scroll zoom.
3. Roof toggle 3 times; visually show/hide roof.
4. Pause/resume 3 times; avatar movement freezes and resumes without jumping.
5. Agent selection through roster AND clicks on Nova, Atlas and Pixel 3D avatars.
6. Tasks tab / World tab repeated; demo UI task reaches
   `demo_completed` with `simulated:true` artifact.
7. API: valid DEMO 201; LIVE 501; lowercase `live` 400 INVALID_MODE;
   malformed JSON array/null 400 VALIDATION_ERROR.
8. No failed external font/CDN requests; report console and page errors.
9. Mobile viewport 390x844: report actual usability, clipping, visibility,
   touch navigation and screenshot, PASS/FAIL/NOT TESTED honestly.

Report exact commit SHA, build/test counts, dev vs production results, screenshots,
FPS context (SwiftShader is not a hardware benchmark), errors, failures, regressions.
Do not deploy or push modifications without a separate instruction.
