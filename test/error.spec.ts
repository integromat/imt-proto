import * as assert from 'assert';
import { DataError, InvalidAccessTokenError, UnknownError } from '../src/error';

describe('Error', () => {
  it('UnknownError', () => {
    let e = new UnknownError(new Error('Error message.'));

    assert.equal(e.message, 'Error message.');
    assert.ok(/^UnknownError: Error message.\n/.test(e.stack!));

    let err = JSON.parse(JSON.stringify(e));

    assert.equal(err.message, 'Error message.');

    // ---

    const te: any = new TypeError('Error message.');
    te.something = true;
    e = new UnknownError(te);

    assert.equal(e.message, 'Error message.');
    assert.ok(/^UnknownError: Error message.\n/.test(e.stack!));

    err = JSON.parse(JSON.stringify(e));

    assert.equal(err.message, 'Error message.');
    assert.equal(err.something, true);
  });

  it('DataError', () => {
    const e = new DataError('Some message.');

    assert.equal(e.name, 'DataError');
    assert.equal(e.message, 'Some message.');
    assert.ok(/^DataError: Some message.\n/.test(e.stack!));
  });

  it('InvalidAccessTokenError', () => {
    const e = new InvalidAccessTokenError('Some message.');

    assert.equal(e.name, 'InvalidAccessTokenError');
    assert.equal(e.message, 'Some message.');
    assert.ok(/^InvalidAccessTokenError: Some message.\n/.test(e.stack!));
  });

  it('JSON serialization with sub-error', () => {
    const error: any = new DataError('Some message.');
    const subError = new TypeError('Type message.');

    error.hash = 'im-hash';
    error.external = true;
    error.something = 'donotserializeme';
    error.suberrors = [subError];
    error.imtInternalError = subError;

    assert.deepStrictEqual(JSON.parse(JSON.stringify(error)), {
      name: 'DataError',
      message: 'Some message.',
      stack: error.stack,
      hash: 'im-hash',
      external: true,
      suberrors: [
        {
          name: 'TypeError',
          message: 'Type message.',
          stack: subError.stack,
        },
      ],
      imtInternalError: {
        name: 'TypeError',
        message: 'Type message.',
        stack: subError.stack,
      },
      imtExceptionHash: 'im-hash',
    });
  });

  it('JSON serialization with sub-error and sub-sub-error', () => {
    const error: any = new DataError('Some message.');
    const subError = new TypeError('Type message.');
    const subSubError = new TypeError('Type message.');

    error.hash = 'im-hash';
    error.external = true;
    error.something = 'donotserializeme';
    error.suberrors = [subError];
    error.imtInternalError = subError;
    subError.suberrors = [subSubError];

    assert.deepStrictEqual(JSON.parse(JSON.stringify(error)), {
      name: 'DataError',
      message: 'Some message.',
      stack: error.stack,
      hash: 'im-hash',
      external: true,
      suberrors: [
        {
          name: 'TypeError',
          message: 'Type message.',
          stack: subError.stack,
          suberrors: [
            {
              name: 'TypeError',
              message: 'Type message.',
              stack: subSubError.stack,
            },
          ],
        },
      ],
      imtInternalError: {
        name: 'TypeError',
        message: 'Type message.',
        stack: subError.stack,
        suberrors: [
          {
            name: 'TypeError',
            message: 'Type message.',
            stack: subSubError.stack,
          },
        ],
      },
      imtExceptionHash: 'im-hash',
    });
  });

  it('JSON serialization with sub-error that is not an Error class instance', () => {
    const error: any = new DataError('Some message.');
    const subError = { message: 'Type message.' };

    error.hash = 'im-hash';
    error.external = true;
    error.something = 'donotserializeme';
    error.suberrors = [subError];
    error.imtInternalError = subError;

    assert.deepStrictEqual(JSON.parse(JSON.stringify(error)), {
      name: 'DataError',
      message: 'Some message.',
      stack: error.stack,
      hash: 'im-hash',
      external: true,
      suberrors: [
        {
          message: 'Type message.',
        },
      ],
      imtInternalError: {
        message: 'Type message.',
      },
      imtExceptionHash: 'im-hash',
    });
  });

  it('should keep hash and imtExceptionHash in sync', () => {
    const error = new Error('Some Message');

    error.hash = 'hash value';
    expect(error.hash).toEqual('hash value');
    expect(error.imtExceptionHash).toEqual('hash value');

    error.imtExceptionHash = 'imtExceptionHash';
    expect(error.hash).toEqual('imtExceptionHash');
    expect(error.imtExceptionHash).toEqual('imtExceptionHash');
  });
});
