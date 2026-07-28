import * as util from 'util';
import { Warning } from './warning';
import { EventEmitter } from 'events';
import { CommonData, EnvironmentData, InternalData } from './base';
import { DoneCallback, DoneWithResultCallback } from './types';

export type EndpointInput = Record<string, any>;
export type EndpointConnection = Record<string, any>;
export type EndpointParameters = Record<string, any>;

/**
 * Base class for Endpoints.
 *
 * Endpoints are single-API-call wrappers and are fully standalone — a sibling of IMTRPC/IMTHook,
 * not an IMTBase subclass. `instanceof IMTRPC` is deliberately `false` for instances of this class.
 *
 * @property {Object} common Collection of common parameters. Read only.
 * @property {Object} parameters Collection of config parameters. Read only.
 * @property {Object} connection Collection of connection parameters. Read only.
 * @property {Object} environment Collection of environment parameters. Read only.
 */

export class IMTEndpoint extends EventEmitter {
  // Field initializers rather than IMTRPC's explicit null-assigning constructor, matching the newer
  // IMTBase style. Safe under the CoffeeScript/.inherits legacy tests because target: ES5 compiles
  // classes to functions.
  public common: CommonData | null = null;
  // Typed as EndpointParameters (Record<string, any>), not `Parameters` from ./base: that type
  // requires `host: string`, which no endpoint host has ever set.
  public parameters: EndpointParameters | null = null;
  public connection: EndpointConnection | null = null;
  public environment: EnvironmentData | null = null;
  public internal: InternalData | null = null;

  /**
   * Initializes the endpoint. Function that overrides should always call super.
   *
   * @callback done Callback to call when endpoint is initialized.
   *     @param {Error} err Error on error, otherwise null.
   */

  initialize(done: DoneCallback): void {
    if ('function' === typeof done) done();
  }

  /**
   * Executes the endpoint.
   *
   * @param {Object} input Endpoint input.
   * @callback done Callback to call when endpoint is done.
   *     @param {Error} err Error on error, otherwise null.
   *     @param {Object} result Endpoint result.
   */

  execute(input: EndpointInput, done: DoneWithResultCallback): void {
    void input;
    void done;
    throw new Error("Must override a superclass method 'execute'.");
  }

  /**
   * Finalizes the endpoint. Function that overrides should always call super.
   *
   * @callback done Callback to call when endpoint is finalized.
   *     @param {Error} err Error on error, otherwise null.
   */

  finalize(done: DoneCallback): void {
    if ('function' === typeof done) done();
  }

  /**
   * Print debug message to Scenario info log. Debug messages are only visible to system administrators.
   *
   * @param {...*} message Message to be printed to Scenario info log.
   */

  debug(...args: any[]): void {
    this.emit('debug', Array.prototype.slice.call(args));
  }

  /**
   * Print message to Scenario info log.
   *
   * @param {...String|Warning|Error} message Message to be printed to Scenario info log.
   */

  log(...args: any[]): void {
    if (args[0] instanceof Warning || args[0] instanceof Error) {
      this.emit('log', args[0]);
    } else {
      this.emit('log', util.format(...args));
    }
  }

  /**
   * Print message to Scenario warning log.
   *
   * @param {...String|Warning|Error} message Message to be printed to Scenario warning log.
   */

  warn(...args: any[]): void {
    if (args[0] instanceof Warning || args[0] instanceof Error) {
      this.emit('warn', args[0]);
    } else {
      this.emit('warn', util.format(...args));
    }
  }
}
