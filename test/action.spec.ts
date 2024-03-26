import * as assert from 'assert';
import { IMTAction } from '../src/action';
import { DataError } from '../src/error';
import { IMTBase } from '../src/base';
import { Bundle, DoneWithInfoCallback } from '../src/types';

class TestAction extends IMTAction {
  write(bundle: Bundle, done: DoneWithInfoCallback) {
    if (bundle.number > 10) return done(new DataError('Number is greater than 10.'));

    done(null, { result: bundle.number * 2 });
  }
}

describe('IMTAction', () => {
  it('should operate successfully', (done) => {
    const input = {
      number: 1,
    };

    const action = new TestAction();
    action.initialize((err) => {
      if (err) {
        done(err);
        return;
      }

      action.write(input, (err, output) => {
        if (err) {
          done(err);
          return;
        }

        assert.ok(action instanceof IMTBase);
        assert.ok(action instanceof IMTAction);
        assert.strictEqual(action.type, 4);
        assert.strictEqual(output.result, 2, 'Result should be equal to 2.');

        action.commit((err) => {
          if (err) {
            done(err);
            return;
          }

          action.finalize(done);
        });
      });
    });
  });

  it('should fail with DataError', (done) => {
    const input = {
      number: 11,
    };

    const action = new TestAction();
    action.initialize((err) => {
      if (err) {
        done(err);
        return;
      }

      action.write(input, (err) => {
        assert.ok(err, 'Write should return error.');
        assert.ok(err instanceof DataError, 'Error should be instanceof DataError.');

        action.rollback((err) => {
          if (err) {
            done(err);
            return;
          }

          action.finalize(done);
        });
      });
    });
  });
});
