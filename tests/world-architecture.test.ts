import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const code = (name: string) =>
  readFileSync(new URL('../src/world/' + name, import.meta.url), 'utf8');

// Architectural guard only; browser/WebGL smoke testing remains mandatory.
test('WorldScene composes modular camera, environment, buildings and avatars', () => {
  const scene = readFileSync(new URL('../src/components/WorldScene.tsx', import.meta.url), 'utf8');
  for (const component of ['CameraRig', 'MainOffice', 'SideBuilding', 'Grounds', 'Pool', 'Avatar']) {
    assert.match(scene, new RegExp('\\b' + component + '\\b'), component + ' must be composed');
  }
  assert.match(scene, /<Canvas\b/);
  assert.match(scene, /onPointerMissed/);
});

test('avatar pause clock and locally rendered labels are preserved', () => {
  assert.match(code('WorldAvatars.tsx'), /simulationTime\.current\s*\+=/);
  assert.match(code('WorldAvatars.tsx'), /if \(!g \|\| paused\) return/);
  assert.match(code('WorldLabel.tsx'), /new CanvasTexture\(canvas\)/);
  assert.doesNotMatch(code('WorldLabel.tsx'), /https?:\/\//);
});
