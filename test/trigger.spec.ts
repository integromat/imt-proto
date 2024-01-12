import { IMTTrigger } from '../src/trigger';
import * as assert from 'assert';
import { ConnectionError } from '../src/error';
import { DoneWithResultCallback } from '../src/types';
import { IMTBase } from '../src';

class TestTrigger extends IMTTrigger {
  addSharedTransaction(): number {
    return -1;
  }

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
  it('should operate successfuly', (done) => {
    const trigger = new TestTrigger();
    trigger.parameters = { host: 'www.integromat.com' };
    trigger.initialize((err) => {
      if (err) return done(err);

      trigger.read((err, output) => {
        if (err) return done(err);

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

        trigger.commit((err) => {
          if (err) return done(err);

          trigger.finalize(done);
        });
      });
    });
  });

  it('should fail with ConnectionError', (done) => {
    const trigger = new TestTrigger();
    trigger.parameters = { host: '127.0.0.1' };
    trigger.initialize((err) => {
      if (err) return done(err);

      trigger.read((err) => {
        assert.ok(err, 'Write should return error.');
        assert.ok(err instanceof ConnectionError, 'Error should be instanceof DataError.');

        trigger.rollback((err) => {
          if (err) return done(err);

          trigger.finalize(done);
        });
      });
    });
  });
});
