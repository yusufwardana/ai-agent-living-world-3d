import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Structural regression guard; this does not substitute for actual WebGL/browser QA.
test('core 3D scene has no blocking remote font/CDN dependency', () => {
  const scene = readFileSync(new URL('../src/components/WorldScene.tsx', import.meta.url), 'utf8');
  const stylesheet = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8');
  assert.match(scene, /CanvasTexture/);
  assert.doesNotMatch(scene, /<Text\b/);
  assert.doesNotMatch(scene, /cdn\.jsdelivr\.net/);
  assert.doesNotMatch(stylesheet, /@import\s+url\(['"]?https?:/);
});
