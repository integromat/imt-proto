import { DataError, InvalidAccessTokenError, UnknownError } from '../src/error';

describe('Error', () => {
  it('UnknownError', () => {
    let unknownError = new UnknownError(new Error('Error message.'));

    expect(unknownError.message).toBe('Error message.');
    expect(unknownError.stack).toMatch(/^UnknownError: Error message.\n/);

    let errorObject = JSON.parse(JSON.stringify(unknownError));

    expect(errorObject.message).toBe('Error message.');

    // ---

    const typeError: any = new TypeError('Error message.');
    typeError.something = true;
    unknownError = new UnknownError(typeError);

    expect(unknownError.message).toBe('Error message.');
    expect(unknownError.stack).toMatch(/^UnknownError: Error message.\n/);

    errorObject = JSON.parse(JSON.stringify(unknownError));

    expect(errorObject.message).toBe('Error message.');
    expect(errorObject.something).toBe(true);
  });

  it('DataError', () => {
    const dataError = new DataError('Some message.');

    expect(dataError.name).toBe('DataError');
    expect(dataError.message).toBe('Some message.');
    expect(dataError.stack).toMatch(/^DataError: Some message.\n/);
  });

  it('InvalidAccessTokenError', () => {
    const invalidTokenError = new InvalidAccessTokenError('Some message.');

    expect(invalidTokenError.name).toBe('InvalidAccessTokenError');
    expect(invalidTokenError.message).toBe('Some message.');
    expect(invalidTokenError.stack).toMatch(/^InvalidAccessTokenError: Some message.\n/);
  });

  it('JSON serialization with sub-error', () => {
    const error: any = new DataError('Some message.');
    const subError = new TypeError('Type message.');

    error.hash = 'im-hash';
    error.external = true;
    error.something = 'donotserializeme';
    error.suberrors = [subError];
    error.imtInternalError = subError;

    expect(JSON.parse(JSON.stringify(error))).toEqual({
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

    expect(JSON.parse(JSON.stringify(error))).toEqual({
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

    expect(JSON.parse(JSON.stringify(error))).toEqual({
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
    expect(error.hash).toBe('hash value');
    expect(error.imtExceptionHash).toBe('hash value');

    error.imtExceptionHash = 'imtExceptionHash';
    expect(error.hash).toBe('imtExceptionHash');
    expect(error.imtExceptionHash).toBe('imtExceptionHash');
  });
});
