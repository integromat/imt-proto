import * as assert from 'assert';
import { IMTRPC } from '../src/rpc';
import { DataError } from '../src/error';
import { Warning } from '../src/warning';
import { DoneWithResultCallback } from '../src/types';
import { EndpointInput, IMTEndpoint } from '../src/endpoint';
import { onceEvent, run } from './helpers';

class TestEndpoint extends IMTEndpoint {
  execute(input: EndpointInput, done: DoneWithResultCallback) {
    if (input.number > 10) return done(new DataError('Number is greater than 10.'));

    done(null, { result: input.number * 2 });
  }
}

describe('IMTEndpoint', () => {
  it('should operate successfully', async () => {
    const endpoint = new TestEndpoint();
    await run((done) => endpoint.initialize(done));

    const output = await run<{ result: number }>((done) => endpoint.execute({ number: 1 }, done));

    assert.ok(endpoint instanceof IMTEndpoint);
    assert.ok(!(endpoint instanceof IMTRPC), 'Endpoint should not be an instance of IMTRPC.');
    assert.strictEqual(output.result, 2, 'Result should be equal to 2.');

    await run((done) => endpoint.finalize(done));
  });

  it('should fail with DataError', async () => {
    const endpoint = new TestEndpoint();
    await run((done) => endpoint.initialize(done));

    const err = await run((done) => endpoint.execute({ number: 11 }, (error) => done(null, error)));
    assert.ok(err, 'Execute should return error.');
    assert.ok(err instanceof DataError, 'Error should be instanceof DataError.');

    await run((done) => endpoint.finalize(done));
  });

  it('should throw when execute is not overridden', () => {
    const endpoint = new IMTEndpoint();

    assert.throws(() => endpoint.execute({}, () => undefined), /Must override a superclass method 'execute'\./);
  });

  it('should remove all listeners on finalize', async () => {
    const endpoint = new IMTEndpoint();
    endpoint.on('log', () => undefined);
    assert.strictEqual(endpoint.listenerCount('log'), 1);

    await run((done) => endpoint.finalize(done));
    assert.strictEqual(endpoint.listenerCount('log'), 0);
  });

  describe('logging', () => {
    it('should emit debug event with the arguments array', async () => {
      const endpoint = new IMTEndpoint();
      const received = onceEvent(endpoint, 'debug');
      endpoint.debug('debug message');
      assert.deepStrictEqual(await received, ['debug message']);
    });

    it('should emit log event with a formatted string', async () => {
      const endpoint = new IMTEndpoint();
      const received = onceEvent(endpoint, 'log');
      endpoint.log('log message');
      assert.strictEqual(await received, 'log message');
    });

    it('should emit log event with the Warning instance verbatim', async () => {
      const endpoint = new IMTEndpoint();
      const warning = new Warning('log warning');
      const received = onceEvent(endpoint, 'log');
      endpoint.log(warning);
      assert.strictEqual(await received, warning);
    });

    it('should emit warn event with a formatted string', async () => {
      const endpoint = new IMTEndpoint();
      const received = onceEvent(endpoint, 'warn');
      endpoint.warn('warn message');
      assert.strictEqual(await received, 'warn message');
    });

    it('should emit warn event with the Warning instance verbatim', async () => {
      const endpoint = new IMTEndpoint();
      const warning = new Warning('warn warning');
      const received = onceEvent(endpoint, 'warn');
      endpoint.warn(warning);
      assert.strictEqual(await received, warning);
    });

    it('should emit log event with an Error instance verbatim', async () => {
      const endpoint = new IMTEndpoint();
      const error = new Error('log error');
      const received = onceEvent(endpoint, 'log');
      endpoint.log(error);
      assert.strictEqual(await received, error);
    });

    it('should emit warn event with an Error instance verbatim', async () => {
      const endpoint = new IMTEndpoint();
      const error = new Error('warn error');
      const received = onceEvent(endpoint, 'warn');
      endpoint.warn(error);
      assert.strictEqual(await received, error);
    });
  });
});
