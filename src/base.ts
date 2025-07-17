/**
 * @module Base
 *
 * Core base classes and types for the Make Native Apps.
 * Provides the fundamental building blocks that all Native Apps modules inherit from.
 */

import * as util from 'util';
import { EventEmitter } from 'events';
import { Warning } from './warning';
import type { DoneCallback, DoneWithReportCallback } from './types';

export type CommonData = Record<string, any>;

export type ModuleData = Record<string, any>;

export type Parameters = {
  host: string;
} & Record<string, any>;

export type ScenarioData = Record<string, any>;

export type EnvironmentData = Record<string, any>;

export type ApiData = Record<string, any>;

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
};

type Events = {
  log: [message: string | Warning | Error];
  warn: [message: string | Warning | Error];
  debug: [messages: any[]];
  audit: [auditPayload: Record<string, unknown>];
};

/**
 * Base class for all Native Apps modules providing core functionality and shared interfaces.
 *
 * @extends EventEmitter
 *
 * @property {ScenarioData} scenario - Collection of scenario parameters (read-only)
 * @property {CommonData} common - Collection of common parameters shared across modules (read-only)
 * @property {ModuleData} data - Module-specific data for this instance in the scenario
 * @property {Parameters} parameters - Configuration parameters (read-only)
 * @property {EnvironmentData} environment - Environment variables (read-only)
 * @property {ModuleType} type - Module type identifier (read-only)
 *
 * @fires IMTBase#log - When a message should be logged to info log
 * @fires IMTBase#warn - When a warning message should be logged
 * @fires IMTBase#debug - When a debug message should be logged
 * @fires IMTBase#audit - When an audit trail entry should be recorded
 */
export class IMTBase extends EventEmitter<Events> {
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

  public common: CommonData | null = null;
  public data: ModuleData | null = null;
  public parameters: Parameters | null = null;
  public scenario: ScenarioData | null = null;
  public environment: EnvironmentData | null = null;
  public internal: InternalData | null = null;

  /**
   * Initializes the module. Derived classes should always call super.initialize().
   *
   * @param {DoneCallback} done - Callback invoked when initialization completes
   * @returns {void}
   */
  initialize(done: DoneCallback): void {
    if (typeof done === 'function') done();
  }

  /**
   * Finalizes the module and cleans up resources. Derived classes should always call super.finalize().
   *
   * @param {DoneCallback} done - Callback invoked when finalization completes
   * @returns {void}
   */
  finalize(done: DoneCallback): void {
    this.removeAllListeners();
    if (typeof done === 'function') done();
  }

  /**
   * Adds this module to a shared transaction scope.
   *
   * @param transactionId - Optional existing transaction ID. If omitted, generates new ID
   * @returns The transaction ID being used
   * @throws {Error} If not implemented by derived class
   */
  addSharedTransaction(transactionId: number): number {
    void transactionId;
    throw new Error("Must override superclass method 'addSharedTransaction'");
  }

  /**
   * Emits an audit message for the Module Execution Log.
   *
   * @param {Record<string, unknown>} auditPayload - Data to be recorded in the audit trail
   * @returns {void}
   */
  audit(auditPayload: Record<string, unknown>): void {
    this.emit('audit', auditPayload);
  }

  /**
   * Commits all pending operations in the module.
   *
   * @param {DoneWithReportCallback} done - Callback invoked with commit results
   * @returns {void}
   */
  commit(done: DoneWithReportCallback): void {
    if (typeof done === 'function') done(null, null);
  }

  /**
   * Logs a debug message visible only to system administrators.
   *
   * @param {...any} messages - Debug message components to be logged
   * @returns {void}
   */
  debug(...messages: any[]): void {
    this.emit('debug', Array.prototype.slice.call(messages));
  }

  /**
   * Logs an informational message to the Scenario log.
   *
   * @param {...(string | Warning | Error)} messages - Message components to be logged
   * @returns {void}
   */
  log(...messages: any[]): void {
    if (messages[0] instanceof Warning || messages[0] instanceof Error) {
      this.emit('log', messages[0]);
    } else {
      this.emit('log', util.format(...messages));
    }
  }

  /**
   * Resets the module state for reuse.
   *
   * @returns {void}
   */
  reset(): void {
    return;
  }

  /**
   * Rolls back all pending operations in the module.
   *
   * @param {DoneWithReportCallback} done - Callback invoked with rollback results
   * @returns {void}
   */
  rollback(done: DoneWithReportCallback): void {
    if (typeof done === 'function') done(null, null);
  }

  /**
   * Logs a warning message to the Scenario warning log.
   *
   * @param {...(string | Warning | Error)} warnings - Warning to be logged
   * @returns {void}
   */
  warn(...warnings: unknown[]): void {
    if (warnings[0] instanceof Warning || warnings[0] instanceof Error) {
      this.emit('warn', warnings[0]);
    } else {
      this.emit('warn', util.format(...warnings));
    }
  }
}
