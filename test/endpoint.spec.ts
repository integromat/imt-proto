import * as assert from 'assert';
import { IMTRPC } from '../src/rpc';
import { DataError } from '../src/error';
import { Warning } from '../src/warning';
import { DoneWithResultCallback } from '../src/types';
import { EndpointInput, IMTEndpoint } from '../src/endpoint';

class TestEndpoint extends IMTEndpoint {
  execute(input: EndpointInput, done: DoneWithResultCallback) {
    if (input.number > 10) return done(new DataError('Number is greater than 10.'));

    done(null, { result: input.number * 2 });
  }
}

describe('IMTEndpoint', () => {
  it('should operate successfully', (done) => {
    const input = {
      number: 1,
    };

    const endpoint = new TestEndpoint();
    endpoint.initialize((err) => {
      if (err) {
        done(err);
        return;
      }

      endpoint.execute(input, (err, output) => {
        if (err) {
          done(err);
          return;
        }

        assert.ok(endpoint instanceof IMTEndpoint);
        assert.ok(!(endpoint instanceof IMTRPC), 'Endpoint should not be an instance of IMTRPC.');
        assert.strictEqual(output.result, 2, 'Result should be equal to 2.');

        endpoint.finalize(done);
      });
    });
  });

  it('should fail with DataError', (done) => {
    const input = {
      number: 11,
    };

    const endpoint = new TestEndpoint();
    endpoint.initialize((err) => {
      if (err) {
        done(err);
        return;
      }

      endpoint.execute(input, (err) => {
        assert.ok(err, 'Execute should return error.');
        assert.ok(err instanceof DataError, 'Error should be instanceof DataError.');

        endpoint.finalize(done);
      });
    });
  });

  it('should throw when execute is not overridden', () => {
    const endpoint = new IMTEndpoint();

    assert.throws(() => endpoint.execute({}, () => undefined), /Must override a superclass method 'execute'\./);
  });

  it('should remove all listeners on finalize', (done) => {
    const endpoint = new IMTEndpoint();
    endpoint.on('log', () => undefined);
    assert.strictEqual(endpoint.listenerCount('log'), 1);

    endpoint.finalize(() => {
      assert.strictEqual(endpoint.listenerCount('log'), 0);
      done();
    });
  });

  describe('logging', () => {
    it('should emit debug event with the arguments array', (done) => {
      const endpoint = new IMTEndpoint();

      endpoint.on('debug', (args) => {
        assert.deepStrictEqual(args, ['debug message']);
        done();
      });

      endpoint.debug('debug message');
    });

    it('should emit log event with a formatted string', (done) => {
      const endpoint = new IMTEndpoint();

      endpoint.on('log', (message) => {
        assert.strictEqual(message, 'log message');
        done();
      });

      endpoint.log('log message');
    });

    it('should emit log event with the Warning instance verbatim', (done) => {
      const endpoint = new IMTEndpoint();
      const warning = new Warning('log warning');

      endpoint.on('log', (message) => {
        assert.strictEqual(message, warning);
        done();
      });

      endpoint.log(warning);
    });

    it('should emit warn event with a formatted string', (done) => {
      const endpoint = new IMTEndpoint();

      endpoint.on('warn', (message) => {
        assert.strictEqual(message, 'warn message');
        done();
      });

      endpoint.warn('warn message');
    });

    it('should emit warn event with the Warning instance verbatim', (done) => {
      const endpoint = new IMTEndpoint();
      const warning = new Warning('warn warning');

      endpoint.on('warn', (message) => {
        assert.strictEqual(message, warning);
        done();
      });

      endpoint.warn(warning);
    });

    it('should emit log event with an Error instance verbatim', (done) => {
      const endpoint = new IMTEndpoint();
      const error = new Error('log error');

      endpoint.on('log', (message) => {
        assert.strictEqual(message, error);
        done();
      });

      endpoint.log(error);
    });

    it('should emit warn event with an Error instance verbatim', (done) => {
      const endpoint = new IMTEndpoint();
      const error = new Error('warn error');

      endpoint.on('warn', (message) => {
        assert.strictEqual(message, error);
        done();
      });

      endpoint.warn(error);
    });
  });
});
