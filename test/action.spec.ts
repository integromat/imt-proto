import * as assert from 'assert';
import { IMTAction } from '../src/action';
import { DataError } from '../src/error';
import { IMTBase } from '../src/base';
import { Bundle, DoneWithInfoCallback } from '../src/types';
import { run } from './helpers';

class TestAction extends IMTAction {
  write(bundle: Bundle, done: DoneWithInfoCallback) {
    if (bundle.number > 10) return done(new DataError('Number is greater than 10.'));

    done(null, { result: bundle.number * 2 });
  }
}

describe('IMTAction', () => {
  it('should operate successfully', async () => {
    const action = new TestAction();
    await run((done) => action.initialize(done));
    const output = await run<{ result: number }>((done) => action.write({ number: 1 }, done));

    assert.ok(action instanceof IMTBase);
    assert.ok(action instanceof IMTAction);
    assert.strictEqual(action.type, 4);
    assert.strictEqual(output.result, 2, 'Result should be equal to 2.');

    await run((done) => action.commit(done));
    await run((done) => action.finalize(done));
  });

  it('should fail with DataError', async () => {
    const action = new TestAction();
    await run((done) => action.initialize(done));
    await assert.rejects(
      run((done) => action.write({ number: 11 }, done)),
      DataError,
    );
    await run((done) => action.rollback(done));
    await run((done) => action.finalize(done));
  });
});
