import { IMTTrigger } from '../src/trigger';
import * as assert from 'assert';
import { ConnectionError } from '../src/error';
import { DoneWithResultCallback } from '../src/types';
import { IMTBase } from '../src';
import { run } from './helpers';

class TestTrigger extends IMTTrigger {
  fetch = () => undefined;

  read(done: DoneWithResultCallback) {
    if (this.parameters?.host === '127.0.0.1') return done(new ConnectionError('Access denied to localhost.'));

    done(null, [
      { id: 1, name: 'Peter' },
      { id: 2, name: 'Patrick' },
    ]);
  }
}

describe('IMTTrigger', () => {
  it('should operate successfuly', async () => {
    const trigger = new TestTrigger();
    trigger.parameters = { host: 'www.integromat.com' };
    await run((done) => trigger.initialize(done));
    const output = await run<Array<{ id: number; name: string }>>((done) => trigger.read(done));

    assert.ok(trigger instanceof IMTBase);
    assert.ok(trigger instanceof IMTTrigger);
    assert.strictEqual(trigger.type, 1);
    assert.deepStrictEqual(
      output,
      [
        { id: 1, name: 'Peter' },
        { id: 2, name: 'Patrick' },
      ],
      'Output not as expected.',
    );

    await run((done) => trigger.commit(done));
    await run((done) => trigger.finalize(done));
  });

  it('should fail with ConnectionError', async () => {
    const trigger = new TestTrigger();
    trigger.parameters = { host: '127.0.0.1' };
    await run((done) => trigger.initialize(done));
    await assert.rejects(
      run((done) => trigger.read(done)),
      ConnectionError,
    );
    await run((done) => trigger.rollback(done));
    await run((done) => trigger.finalize(done));
  });
});
