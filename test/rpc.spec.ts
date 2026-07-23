import * as assert from 'assert';
import { EventEmitter } from 'events';
import { IMTRPC } from '../src/rpc';
import { DoneWithResultCallback } from '../src/types';

class TestRPC extends IMTRPC {
  execute(done: DoneWithResultCallback) {
    done(null, { rows: [1, 2, 3] });
  }
}

describe('IMTRPC', () => {
  it('should be an EventEmitter with null collections', () => {
    const rpc = new IMTRPC();
    assert.ok(rpc instanceof EventEmitter);
    assert.strictEqual(rpc.common, null);
    assert.strictEqual(rpc.parameters, null);
    assert.strictEqual(rpc.environment, null);
    assert.strictEqual(rpc.internal, null);
  });

  it('should run lifecycle callbacks', () =>
    new Promise<void>((resolve, reject) => {
      const rpc = new IMTRPC();
      rpc.initialize((err) => {
        if (err) return reject(err);
        rpc.finalize((err) => (err ? reject(err) : resolve()));
      });
    }));

  it('should not throw when lifecycle methods are called without a callback', () => {
    const rpc = new IMTRPC();
    const noop = undefined as never;
    assert.doesNotThrow(() => rpc.initialize(noop));
    assert.doesNotThrow(() => rpc.finalize(noop));
  });

  it('execute should throw when not overridden', () => {
    assert.throws(() => new IMTRPC().execute(() => undefined), /execute/);
  });

  it('execute should return response when overridden', () =>
    new Promise<void>((resolve, reject) => {
      new TestRPC().execute((err, response) => {
        if (err) return reject(err);
        assert.deepStrictEqual(response, { rows: [1, 2, 3] });
        resolve();
      });
    }));

  it('debug should throw when not overridden', () => {
    assert.throws(() => new IMTRPC().debug(), /debug/);
  });
});
