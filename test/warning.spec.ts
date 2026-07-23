import * as assert from 'assert';
import { Warning } from '../src/warning';

describe('Warning', () =>
  it('general', () =>
    new Promise<void>((resolve, reject) => {
      const done = (err?: Error | null) => (err ? reject(err) : resolve());

      const w = new Warning('Warning message.');
      assert.equal(w.message, 'Warning message.');
      assert.equal(typeof w.stack, 'string');

      done();
    })));
