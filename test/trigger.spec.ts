import { IMTTrigger } from '../src/trigger';
import { ConnectionError } from '../src/error';
import type { DoneWithResultCallback } from '../src/types';
import { IMTBase } from '../src';
import { initializeAsync, readAsync, commitAsync, rollbackAsync, finalizeAsync } from './helpers';

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
  it('should operate successfully', async () => {
    const trigger = new TestTrigger();
    trigger.parameters = { host: 'www.integromat.com' };

    await initializeAsync(trigger);

    const output = await readAsync(trigger);

    expect(trigger).toBeInstanceOf(IMTBase);
    expect(trigger).toBeInstanceOf(IMTTrigger);
    expect(trigger.type).toBe(1);
    expect(output).toEqual([
      { id: 1, name: 'Peter' },
      { id: 2, name: 'Patrick' },
    ]);

    await commitAsync(trigger);
    await finalizeAsync(trigger);
  });

  it('should fail with ConnectionError', async () => {
    const trigger = new TestTrigger();
    trigger.parameters = { host: '127.0.0.1' };

    await initializeAsync(trigger);

    await expect(readAsync(trigger)).rejects.toBeInstanceOf(ConnectionError);

    await rollbackAsync(trigger);
    await finalizeAsync(trigger);
  });
});
