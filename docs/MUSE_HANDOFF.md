# Muse implementation handoff — paste this into Muse

Read `docs/MASTER_PROMPT.md` as the target vision and `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, `docs/STATUS.md` for current verified and missing parts.

You are extending an EXISTING repository, not creating a static mockup. Inspect the actual code and run `npm install`, `npm run typecheck`, `npm test`, `npm run build`, and browser smoke tests before editing. Preserve all current functioning behaviors.

Prioritize a complete, secure AI vertical slice: one task created in the UI -> authenticated server request -> authorized provider execution -> durable event history -> stored artifact -> avatar reacts to verified backend states. Do not claim any simulated demo as real LLM execution. Provider credentials must never reach the browser or git; missing credentials should produce `INTEGRATION_REQUIRED` rather than fabricated task completion.

Implement in small verifiable commits, updating docs/STATUS.md on each completion with PASS/FAIL/NOT TESTED evidence. Obtain approval before paid calls, publication, destructive commands, or external side effects. Never assume code in the repo has been deployed.

Only after vertical-slice verification proceed to expanded buildings, multi-agent orchestration, life simulation, and world editor. Keep backend AI execution separate from visualization and leisure timing.

## Following the initial Muse QA report

Before expanding features, execute the browser regression checklist in [`MUSE_RETEST.md`](MUSE_RETEST.md) against the current repository commit. Do not treat passing CLI tests as proof that WebGL renders or React interactions are reliable.
