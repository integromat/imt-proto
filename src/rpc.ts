/**
 * @module RPC
 *
 * Provides remote procedure call functionality for interacting with external services.
 * RPC modules enable communication with third-party APIs and services.
 */

import { EventEmitter } from 'events';
import type { CommonData, EnvironmentData, InternalData, Parameters } from './base';
import type { DoneCallback, DoneWithResultCallback } from './types';

/**
 * Base class for all RPC modules.
 *
 * RPC modules handle communication with external services and APIs,
 * providing a standardized interface for making remote procedure calls.
 * They manage authentication, request formatting, and response processing.
 */
export class IMTRPC extends EventEmitter {
  public common: CommonData | null;
  public parameters: Parameters | null;
  public environment: EnvironmentData | null;
  public internal: InternalData | null;

  constructor() {
    super();

    this.common = null;
    this.parameters = null;
    this.environment = null;
    this.internal = null;
  }

  /**
   * Initializes the RPC module.
   *
   * Derived classes should override this method to perform any necessary
   * setup operations such as establishing connections, validating
   * credentials, or preparing request contexts.
   *
   * @param done - Callback to invoke when initialization is complete
   */
  initialize(done: DoneCallback): void {
    if ('function' === typeof done) done();
  }

  /**
   * Finalizes the RPC module and cleans up resources.
   *
   * Derived classes should override this method to perform cleanup
   * operations such as closing connections, clearing caches, or
   * releasing allocated resources.
   *
   * @param done - Callback to invoke when finalization is complete
   */
  finalize(done: DoneCallback): void {
    if ('function' === typeof done) done();
  }

  /**
   * Executes the remote procedure call.
   *
   * This method must be overridden by subclasses to implement the specific
   * RPC logic, including request preparation, API communication, and
   * response processing.
   *
   * @param done - Callback to invoke when the RPC execution is complete
   * @throws {Error} Always throws since this method must be overridden
   */
  execute(done: DoneWithResultCallback): void {
    void done;
    throw new Error("Must override superclass method 'execute'");
  }

  /**
   * Logs debug messages visible only to system administrators.
   *
   * This method must be overridden by subclasses to provide proper
   * debug logging functionality integrated with the system's logging
   * infrastructure.
   *
   * @param messages - Debug message components to be logged
   * @throws {Error} Always throws since this method must be overridden
   */
  debug(...messages: any[]): void {
    void messages;
    throw new Error("Must override superclass method 'debug'");
  }
}
