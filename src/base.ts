import * as util from 'util';
import { Warning } from './warning';
import { EventEmitter } from 'events';
import { DoneCallback, DoneWithReportCallback } from './types';

export type Common = Record<string, any>;

export type Data = Record<string, any>;

export type Parameters = {
  host: string;
} & Record<string, any>;

export type Scenario = Record<string, any>;

export type Environment = Record<string, any>;

export enum ModuleType {
  NONE = 0,
  TRIGGER = 1,
  TRANSFORMER = 2,
  ROUTER = 3,
  ACTION = 4,
  LISTENER = 5,
  FEEDER = 6,
  AGGREGATOR = 7,
  DIRECTIVE = 8,
  CONVERGER = 9,
  HITL = 10,
  PAUSER = 11,
}

/**
 * Base class for all Modules.
 *
 * @property scenario - Collection of scenario parameters. Read only.
 * @property common - Collection of common parameters. Read only.
 * @property data - Collection of data specific to one concrete occurance of this module in Scenario.
 * @property parameters - Collection of config parameters. Read only.
 * @property environment - Collection of environment variables. Read only.
 * @property type - Module type. Read only.
 *
 * @event log - Dispatched when message is about to be printed to info log.
 * @event warn - Dispatched when message is about to be printed to warning log.
 */
export abstract class IMTBase extends EventEmitter {
  public abstract readonly type: ModuleType;

  public static readonly MODULETYPE_NONE = ModuleType.NONE;
  public static readonly MODULETYPE_TRIGGER = ModuleType.TRIGGER;
  public static readonly MODULETYPE_TRANSFORMER = ModuleType.TRANSFORMER;
  public static readonly MODULETYPE_ROUTER = ModuleType.ROUTER;
  public static readonly MODULETYPE_ACTION = ModuleType.ACTION;
  public static readonly MODULETYPE_LISTENER = ModuleType.LISTENER;
  public static readonly MODULETYPE_FEEDER = ModuleType.FEEDER;
  public static readonly MODULETYPE_AGGREGATOR = ModuleType.AGGREGATOR;
  public static readonly MODULETYPE_DIRECTIVE = ModuleType.DIRECTIVE;
  public static readonly MODULETYPE_CONVERGER = ModuleType.CONVERGER;
  public static readonly MODULETYPE_HITL = ModuleType.HITL;
  public static readonly MODULETYPE_PAUSER = ModuleType.PAUSER;

  public common: Common | null = null;
  public data: Data | null = null;
  public parameters: Parameters | null = null;
  public scenario: Scenario | null = null;
  public environment: Environment | null = null;

  /**
   * Initializes the module. Function that overrides should always call super.
   *
   * @callback done Callback to call when module is initialized.
   *     @param {Error} err Error on error, otherwise null.
   */

  initialize(done: DoneCallback) {
    if ('function' === typeof done) done();
  }

  /**
   * Finalizes the module. Function that overrides should always call super.
   *
   * @callback done Callback to call when module is finalized.
   *     @param {Error} err Error on error, otherwise null.
   */

  finalize(done: DoneCallback) {
    this.removeAllListeners();
    if ('function' === typeof done) done();
  }

  /**
   * Adds module to a shared transaction.
   *
   * @param {Number} [id] Transaction ID. If omited, new transaction ID is generated.
   * @return {Number} Transaction ID.
   */
  abstract addSharedTransaction(id: number): number;

  /**
   * Emit audit message to Engine log. The arguments provided are intended to be shown in the Audit Trail for Module Execution Logs
   *
   * @param {object} payload Payload to be added to the Module Execution Log
   */

  audit(payload: Record<string, unknown>) {
    this.emit('audit', payload);
  }

  /**
   * Commit all operations.
   *
   * @callback done Callback to call when operations are done.
   *     @param {Error} err Error on error, otherwise null.
   *     @param {Array} report Commit report (see docs).
   */

  commit(done: DoneWithReportCallback) {
    if ('function' === typeof done) done(null, null);
  }

  /**
   * Print debug message to Scenario info log. Debug messages are only visible to system administrators.
   *
   * @param {...*} message Message to be printed to Scenario info log.
   */

  debug(...args: any[]) {
    this.emit('debug', Array.prototype.slice.call(args));
  }

  /**
   * Print message to Scenario info log.
   *
   * @param {...String|Warning|Error} message Message to be printed to Scenario info log.
   */

  log(...args: any[]) {
    if (args[0] instanceof Warning || args[0] instanceof Error) {
      this.emit('log', args[0]);
    } else {
      this.emit('log', util.format(...args));
    }
  }

  /**
   * Reset the module so it can be reused again.
   */

  reset(): void {
    return;
  }

  /**
   * Rollback all operations.
   *
   * @callback done Callback to call when operations are done.
   *     @param {Error} err Error on error, otherwise null.
   *     @param {Array} report Rollback report (see docs).
   */

  rollback(done: DoneWithReportCallback) {
    if ('function' === typeof done) done(null, null);
  }

  /**
   * Print message to Scenario warning log.
   *
   * @param {...String} message Message to be printed to Scenario warning log.
   */

  warn(...args: any[]) {
    if (args[0] instanceof Warning || args[0] instanceof Error) {
      this.emit('warn', args[0]);
    } else {
      this.emit('warn', util.format(...args));
    }
  }
}
