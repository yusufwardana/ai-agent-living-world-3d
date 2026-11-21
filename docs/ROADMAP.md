# Implementation roadmap and acceptance gates

## P1 — Core 3D campus (starter)
- [x] Render actual procedural 3D campus, office interior, campus props, 10 stylized avatars.
- [x] Orbit/zoom, view presets, roof toggle, select agent, pause visual simulation.
- [x] Demo task server with persisted events and explicit simulated output.
- [x] Refactor core scene into camera, label, buildings, props, avatar modules (source committed; post-refactor Muse browser validation pending).
- [ ] Replace scripted roaming with navmesh/pathfinding and collisions.
- [ ] Desktop/mobile browser QA, performance profiling, pixel ratio quality controls, asset audits.
- [ ] Multi-floor occlusion/cutaway controls and interior navigation.

Gate: browser smoke test on desktop/mobile and reproducible benchmark are required before P1 is called complete.

## P2 — Real AI vertical slice
- [ ] Supabase Auth, Postgres schema, RLS, Storage, organization isolation.
- [ ] Durable queue and server-side LLM provider connection with encrypted credentials.
- [ ] One task → one authorized AI run → artifact persisted → event log → avatar reaction.
- [ ] Cancellation, timeouts, provider failure, budget guard, authorization/approval test cases.

Gate: run a real authorized task and open its persisted artifact; show failed runs as failures. No demo output may satisfy this gate.

## P3 — World expansion and orchestration
- [ ] Multi-floor buildings and custom rooms; 3D navigation pathfinding.
- [ ] Teams, task dependencies, human approvals, handoffs, live meeting logs.
- [ ] Additional agent provider adapters, real task cost accounting.

## P4 — Life simulation, world builder
- [ ] Schedule-driven leisure, apartments, sports, pool, gym, café.
- [ ] World editor, collisions, save/load with valid paths, undo/redo.
- [ ] Stable decoupling of simulation time and AI execution time.

## P5 — Security and performance hardening
- [ ] RLS cross-user testing; secret protection; artifact access tests.
- [ ] 3/10/40/80/100 avatar render profiling with actual hardware details.
- [ ] Frame times, memory ceilings, throttling, LOD, batching, compression, regressions.
- [ ] Release checklist, backup/recovery, observability, incident readiness.
