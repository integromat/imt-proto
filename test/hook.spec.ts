import * as assert from 'assert';
import type { Request } from 'request';
import { EventEmitter } from 'events';
import { IMTHook } from '../src/hook';
import { DoneWithResultCallback } from '../src/types';
import { run } from './helpers';

const fakeRequest = {} as Request;

class TestHook extends IMTHook {
  parse(request: Request, done: DoneWithResultCallback) {
    void request;
    done(null, [{ id: 1 }, { id: 2 }]);
  }
}

describe('IMTHook', () => {
  it('should be an EventEmitter', () => {
    assert.ok(new IMTHook() instanceof EventEmitter);
  });

  it('should run lifecycle callbacks', async () => {
    const hook = new IMTHook();
    await run((done) => hook.initialize(done));
    await run((done) => hook.finalize(done));
  });

  it('should not throw when lifecycle methods are called without a callback', () => {
    const hook = new IMTHook();
    const noop = undefined as never;
    assert.doesNotThrow(() => hook.initialize(noop));
    assert.doesNotThrow(() => hook.finalize(noop));
    assert.doesNotThrow(() => hook.getFormSpec(fakeRequest, noop));
  });

  it('parse should throw when not overridden', () => {
    assert.throws(() => new IMTHook().parse(fakeRequest, () => undefined), /parse/);
  });

  it('parse should return items when overridden', async () => {
    const items = await run((done) => new TestHook().parse(fakeRequest, done));
    assert.deepStrictEqual(items, [{ id: 1 }, { id: 2 }]);
  });

  it('filter should accept items by default', async () => {
    const passed = await run<boolean>((done) => new IMTHook().filter({ id: 1 }, {}, done));
    assert.strictEqual(passed, true);
  });

  it('filter should not throw without a callback', () => {
    assert.doesNotThrow(() => new IMTHook().filter({}, {}, undefined as never));
  });

  it('getFormSpec should call back by default', async () => {
    await run((done) => new IMTHook().getFormSpec(fakeRequest, done));
  });
});
