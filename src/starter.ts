/**
 * @module Starter
 *
 * Provides starter functionality for initiating scenario execution or sub-scenarios.
 * Starters handle the initialization and launch of processing pipelines.
 */

import { IMTBase, ModuleType } from './base';
import type { DoneWithResultCallback } from './types';

/**
 * Base class for all Starter modules.
 *
 * Starters are responsible for initiating scenario execution or launching
 * sub-scenarios. They handle the bootstrap process and provide the initial
 * trigger for processing pipelines to begin their operations.
 */
export class IMTStarter extends IMTBase {
  public readonly type = ModuleType.STARTER;

  /**
   * Starts the scenario or sub-scenario execution.
   *
   * This method must be overridden by subclasses to implement specific
   * startup logic, such as initializing resources, triggering scenarios,
   * or preparing the execution environment.
   *
   * @param done - Callback to invoke when startup operation is complete
   * @throws {Error} Always throws since this method must be overridden
   */
  start(done: DoneWithResultCallback): void {
    void done;
    throw new Error("Must override superclass method 'start'");
  }
}
