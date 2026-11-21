import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseTaskMode } from '../server/task-mode.js';

test('request mode accepts only exact DEMO and LIVE values', () => {
  assert.equal(parseTaskMode('DEMO'), 'DEMO');
  assert.equal(parseTaskMode('LIVE'), 'LIVE');
});

test('invalid and lowercase mode cannot silently become DEMO', () => {
  for (const value of ['live', 'demo', 'Live', 'DEMO ', '', null, undefined, 1, {}, []]) {
    assert.equal(parseTaskMode(value), null, 'unexpected accepted mode: ' + String(value));
  }
});
