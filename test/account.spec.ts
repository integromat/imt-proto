import * as assert from 'assert';
import { Readable } from 'stream';
import { IMTAccount, IMTOAuthAccount } from '../src/account';

/** Runs a Node-style callback method and resolves once it calls back. */
function run(fn: (done: (err?: Error | null) => void) => void): Promise<void> {
  return new Promise((resolve, reject) => fn((err) => (err ? reject(err) : resolve())));
}

describe('IMTAccount', () => {
  it('should initialize with null common and data', () => {
    const account = new IMTAccount();
    assert.strictEqual(account.common, null);
    assert.strictEqual(account.data, null);
  });

  it('should run lifecycle callbacks', async () => {
    const account = new IMTAccount();
    await run((done) => account.initialize(done));
    await run((done) => account.test(done));
    await run((done) => account.validate(done));
    await run((done) => account.finalize(done));
  });

  it('should not throw when lifecycle methods are called without a callback', () => {
    const account = new IMTAccount();
    const noop = undefined as never;
    assert.doesNotThrow(() => account.initialize(noop));
    assert.doesNotThrow(() => account.test(noop));
    assert.doesNotThrow(() => account.validate(noop));
    assert.doesNotThrow(() => account.finalize(noop));
  });
});

describe('IMTOAuthAccount', () => {
  it('should extend IMTAccount', () => {
    const account = new IMTOAuthAccount();
    assert.ok(account instanceof IMTAccount);
  });

  it('should run OAuth flow callbacks', async () => {
    const account = new IMTOAuthAccount();
    const req = Readable.from([]);

    await run((done) => account.accountFromCallbackRequest(req, done));
    await run((done) => account.authorize(['read', 'write'], done));
    await run((done) => account.callback(req, done));
    await run((done) => account.extendScope(['admin'], done));
    await run((done) => account.reauthorize(done));
    await run((done) => account.invalidate(done));
  });

  it('should not throw when OAuth methods are called without a callback', () => {
    const account = new IMTOAuthAccount();
    const req = Readable.from([]);
    const noop = undefined as never;
    assert.doesNotThrow(() => account.accountFromCallbackRequest(req, noop));
    assert.doesNotThrow(() => account.authorize([], noop));
    assert.doesNotThrow(() => account.callback(req, noop));
    assert.doesNotThrow(() => account.extendScope([], noop));
    assert.doesNotThrow(() => account.reauthorize(noop));
    assert.doesNotThrow(() => account.invalidate(noop));
  });
});
