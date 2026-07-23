import * as assert from 'assert';
import { IMTBase, ModuleType } from '../src/base';
import { Warning } from '../src/warning';

class TestModule extends IMTBase {}

/** Waits for a single named event and resolves with its payload. */
function onceEvent<T = unknown>(module: IMTBase, event: string): Promise<T> {
  return new Promise((resolve) => module.on(event, (payload: T) => resolve(payload)));
}

describe('IMTBase methods', () => {
  it('should default type to NONE', () => {
    assert.strictEqual(new TestModule().type, ModuleType.NONE);
    assert.strictEqual(IMTBase.MODULETYPE_NONE, 0);
    assert.strictEqual(IMTBase.MODULETYPE_ACTION, 4);
  });

  it('should emit debug event with sliced args', async () => {
    const module = new TestModule();
    const received = onceEvent(module, 'debug');
    module.debug('hello', 42);
    assert.deepStrictEqual(await received, ['hello', 42]);
  });

  it('should emit audit event with payload', async () => {
    const module = new TestModule();
    const payload = { action: 'created', id: 7 };
    const received = onceEvent(module, 'audit');
    module.audit(payload);
    assert.deepStrictEqual(await received, payload);
  });

  it('should emit log event with formatted string', async () => {
    const module = new TestModule();
    const received = onceEvent(module, 'log');
    module.log('count: %d', 5);
    assert.strictEqual(await received, 'count: 5');
  });

  it('should emit log event with Warning instance unchanged', async () => {
    const module = new TestModule();
    const warning = new Warning('be careful');
    const received = onceEvent(module, 'log');
    module.log(warning);
    assert.strictEqual(await received, warning);
  });

  it('should emit log event with Error instance unchanged', async () => {
    const module = new TestModule();
    const error = new Error('boom');
    const received = onceEvent(module, 'log');
    module.log(error);
    assert.strictEqual(await received, error);
  });

  it('should emit warn event with formatted string', async () => {
    const module = new TestModule();
    const received = onceEvent(module, 'warn');
    module.warn('watch %s', 'out');
    assert.strictEqual(await received, 'watch out');
  });

  it('should emit warn event with Warning instance unchanged', async () => {
    const module = new TestModule();
    const warning = new Warning('careful');
    const received = onceEvent(module, 'warn');
    module.warn(warning);
    assert.strictEqual(await received, warning);
  });

  it('should emit warn event with Error instance unchanged', async () => {
    const module = new TestModule();
    const error = new Error('boom');
    const received = onceEvent(module, 'warn');
    module.warn(error);
    assert.strictEqual(await received, error);
  });

  it('commit should call done with null report', () =>
    new Promise<void>((resolve, reject) => {
      new TestModule().commit((err, report) => {
        if (err) return reject(err);
        assert.strictEqual(report, null);
        resolve();
      });
    }));

  it('rollback should call done with null report', () =>
    new Promise<void>((resolve, reject) => {
      new TestModule().rollback((err, report) => {
        if (err) return reject(err);
        assert.strictEqual(report, null);
        resolve();
      });
    }));

  it('lifecycle methods should not throw when called without a callback', () => {
    const module = new TestModule();
    const noop = undefined as never;
    assert.doesNotThrow(() => module.initialize(noop));
    assert.doesNotThrow(() => module.commit(noop));
    assert.doesNotThrow(() => module.rollback(noop));
    assert.doesNotThrow(() => module.finalize(noop));
  });

  it('reset should return undefined', () => {
    assert.strictEqual(new TestModule().reset(), undefined);
  });

  it('addSharedTransaction should throw by default', () => {
    assert.throws(() => new TestModule().addSharedTransaction(1), /addSharedTransaction/);
  });

  it('finalize should remove all listeners', () =>
    new Promise<void>((resolve, reject) => {
      const module = new TestModule();
      module.on('log', () => reject(new Error('listener should have been removed')));
      module.finalize((err) => {
        if (err) return reject(err);
        assert.strictEqual(module.listenerCount('log'), 0);
        resolve();
      });
    }));
});
