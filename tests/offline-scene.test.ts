import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Structural regression guard; this does not substitute for actual WebGL/browser QA.
test('core 3D scene has no blocking remote font/CDN dependency', () => {
  const scene = readFileSync(new URL('../src/components/WorldScene.tsx', import.meta.url), 'utf8');
  const label = readFileSync(new URL('../src/world/WorldLabel.tsx', import.meta.url), 'utf8');
  const stylesheet = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8');
  assert.match(label, /CanvasTexture/);
  assert.match(scene, /WorldBuildings/);
  assert.match(scene, /WorldAvatars/);
  assert.doesNotMatch(scene, /<Text\b/);
  assert.doesNotMatch(label, /<Text\b/);
  assert.doesNotMatch(scene, /cdn\.jsdelivr\.net/);
  assert.doesNotMatch(label, /cdn\.jsdelivr\.net/);
  assert.doesNotMatch(stylesheet, /@import\s+url\(['"]?https?:/);
});
