import { EventEmitter } from 'events';
import { CommonData, EnvironmentData, Parameters } from './base';
import { DoneCallback, DoneWithResultCallback } from './types';

/**
 * Base class for RPC.
 *
 * @property {Object} common Collection of common parameters. Read only.
 * @property {Object} environment Collection of environment parameters. Read only.
 * @property {Object} parameters Collection of config parameters. Read only.
 */

export class IMTRPC extends EventEmitter {
  public common: CommonData | null;
  public parameters: Parameters | null;
  public environment: EnvironmentData | null;

  constructor() {
    super();

    this.common = null;
    this.parameters = null;
    this.environment = null;
  }

  /**
   * Initializes the RPC. Function that overrides should always call super.
   *
   * @callback done Callback to call when RPC is initialized.
   *     @param {Error} err Error on error, otherwise null.
   */

  initialize(done: DoneCallback) {
    if ('function' === typeof done) done();
  }

  /**
   * Finalizes the RPC. Function that overrides should always call super.
   *
   * @callback done Callback to call when RPC is finalized.
   *     @param {Error} err Error on error, otherwise null.
   */

  finalize(done: DoneCallback) {
    if ('function' === typeof done) done();
  }

  /**
   * Executes the RPC.
   *
   * @callback done Callback to call when RPC is done.
   *     @param {Error} err Error on error, otherwise null.
   *     @param {Object} response RPC response.
   */

  execute(done: DoneWithResultCallback): void {
    void done;
    throw new Error("Must override a superclass method 'execute'.");
  }

  /**
   * Print debug message to Scenario info log. Debug messages are only visible to system administrators.
   *
   * @param {...*} message Message to be printed to Scenario info log.
   */

  debug(): void {
    throw new Error("Must override a superclass method 'debug'.");
  }
}
