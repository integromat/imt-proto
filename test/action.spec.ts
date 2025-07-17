import { IMTAction } from '../src/action';
import { DataError } from '../src/error';
import { IMTBase } from '../src/base';
import type { Bundle, DoneWithInfoCallback } from '../src/types';
import { initializeAsync, writeAsync, commitAsync, rollbackAsync, finalizeAsync } from './helpers';

class TestAction extends IMTAction {
  write(bundle: Bundle, done: DoneWithInfoCallback) {
    if (bundle.number > 10) return done(new DataError('Number is greater than 10.'));

    done(null, { result: bundle.number * 2 });
  }
}

describe('IMTAction', () => {
  it('should operate successfully', async () => {
    const input = {
      number: 1,
    };

    const action = new TestAction();

    await initializeAsync(action);

    const output = await writeAsync(action, input);

    expect(action).toBeInstanceOf(IMTBase);
    expect(action).toBeInstanceOf(IMTAction);
    expect(action.type).toBe(4);
    expect(output.result).toBe(2);

    await commitAsync(action);
    await finalizeAsync(action);
  });

  it('should fail with DataError', async () => {
    const input = {
      number: 11,
    };

    const action = new TestAction();

    await initializeAsync(action);

    await expect(writeAsync(action, input)).rejects.toBeInstanceOf(DataError);

    await rollbackAsync(action);
    await finalizeAsync(action);
  });
});
