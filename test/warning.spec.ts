import * as assert from 'assert';
import { Warning } from '../src/warning';

describe('Warning', () => {
  it('general', () =>
    new Promise<void>((resolve, reject) => {
      const done = (err?: Error | null) => (err ? reject(err) : resolve());

      const w = new Warning('Warning message.');
      assert.equal(w.message, 'Warning message.');
      assert.equal(typeof w.stack, 'string');

      done();
    }));

  it('toString should include name and message', () => {
    assert.equal((new Warning('Something') as any).toString(), 'Warning: Something');
  });

  it('inspect should wrap name and message in brackets', () => {
    assert.equal((new Warning('Something') as any).inspect(), '[Warning: Something]');
  });

  it('toJSON should serialize name, message and stack', () => {
    const w = new Warning('Something');
    assert.deepStrictEqual(JSON.parse(JSON.stringify(w)), {
      name: 'Warning',
      message: 'Something',
      stack: w.stack,
    });
  });
});
