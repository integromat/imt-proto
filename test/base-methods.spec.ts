import * as assert from 'assert';
import { IMTBase, ModuleType } from '../src/base';
import { Warning } from '../src/warning';
import { onceEvent, run } from './helpers';

class TestModule extends IMTBase {}

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

  it('commit should call done with null report', async () => {
    const report = await run<unknown[] | null>((done) => new TestModule().commit(done));
    assert.strictEqual(report, null);
  });

  it('rollback should call done with null report', async () => {
    const report = await run<unknown[] | null>((done) => new TestModule().rollback(done));
    assert.strictEqual(report, null);
  });

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

  it('finalize should remove all listeners', async () => {
    const module = new TestModule();
    module.on('log', () => assert.fail('listener should have been removed'));
    await run((done) => module.finalize(done));
    assert.strictEqual(module.listenerCount('log'), 0);
  });
});
