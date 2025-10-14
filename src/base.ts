import * as util from 'util';
import { Warning } from './warning';
import { EventEmitter } from 'events';
import { DoneCallback, DoneWithReportCallback } from './types';

export type CommonData = Record<string, any>;

export type ModuleData = Record<string, any>;

export type Parameters = {
  host: string;
} & Record<string, any>;

export type ScenarioData = Record<string, any>;

export type EnvironmentData = Record<string, any>;

export type InternalData = Record<string, any>;

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
  SEARCH = 9,
  CONVERGER = 10,
  HITL = 11,
  RETURNER = 12,
  PAUSER = 13,
  STARTER = 14,
  AGENT = 15,
  CONDITIONAL = 16,
}

export const moduleTypeNames = {
  [ModuleType.TRIGGER]: { singular: 'trigger', plural: 'triggers' } as const,
  [ModuleType.TRANSFORMER]: { singular: 'transformer', plural: 'transformers' } as const,
  [ModuleType.ROUTER]: { singular: 'router', plural: 'routers' } as const,
  [ModuleType.ACTION]: { singular: 'action', plural: 'actions' } as const,
  [ModuleType.LISTENER]: { singular: 'listener', plural: 'listeners' } as const,
  [ModuleType.FEEDER]: { singular: 'feeder', plural: 'feeders' } as const,
  [ModuleType.AGGREGATOR]: { singular: 'aggregator', plural: 'aggregators' } as const,
  [ModuleType.DIRECTIVE]: { singular: 'directive', plural: 'directives' } as const,
  [ModuleType.SEARCH]: { singular: 'search', plural: 'searches' } as const,
  [ModuleType.CONVERGER]: { singular: 'converger', plural: 'convergers' } as const,
  [ModuleType.HITL]: { singular: 'hitl', plural: 'hitls' } as const,
  [ModuleType.RETURNER]: { singular: 'returner', plural: 'returners' } as const,
  [ModuleType.PAUSER]: { singular: 'pauser', plural: 'pausers' } as const,
  [ModuleType.STARTER]: { singular: 'starter', plural: 'starters' } as const,
  [ModuleType.AGENT]: { singular: 'agent', plural: 'agents' } as const,
  [ModuleType.CONDITIONAL]: { singular: 'conditional', plural: 'conditionals' } as const,
};

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
export class IMTBase extends EventEmitter {
  public readonly type: ModuleType = ModuleType.NONE;

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
  public static readonly MODULETYPE_RETURNER = ModuleType.RETURNER;
  public static readonly MODULETYPE_STARTER = ModuleType.STARTER;
  public static readonly MODULETYPE_AGENT = ModuleType.AGENT;
  public static readonly MODULETYPE_CONDITIONAL = ModuleType.CONDITIONAL;

  public common: CommonData | null = null;
  public data: ModuleData | null = null;
  public parameters: Parameters | null = null;
  public scenario: ScenarioData | null = null;
  public environment: EnvironmentData | null = null;
  public internal: InternalData | null = null;

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
  addSharedTransaction(id: number): number {
    void id;
    throw new Error("Must override a superclass method 'addSharedTransaction'.");
  }

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
