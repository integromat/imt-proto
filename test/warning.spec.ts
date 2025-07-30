import { Warning } from '../src/warning';

describe('Warning', () =>
  it('general', () => {
    const warning = new Warning('Warning message.');
    expect(warning.message).toBe('Warning message.');
    expect(typeof warning.stack).toBe('string');
  }));
