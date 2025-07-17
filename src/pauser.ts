/**
 * @module Pauser
 *
 * Provides pause functionality for temporarily halting scenario execution.
 * Pausers allow scenarios to wait for external conditions or manual intervention.
 */

import { IMTBase, ModuleType } from './base';
import type { Bundle, DoneWithResultCallback } from './types';

/**
 * Base class for all Pauser modules.
 *
 * Pausers temporarily halt scenario execution, allowing scenarios to wait
 * for external conditions, manual intervention, or time-based delays.
 * This is essential for coordinating with external systems or human approval processes.
 */
export class IMTPauser extends IMTBase {
  public readonly type = ModuleType.PAUSER;

  /**
   * Initiates the pause operation.
   *
   * This method must be overridden by subclasses to implement specific
   * pause logic, such as waiting for external events, user input, or
   * time-based delays.
   *
   * @param bundle - Collection of directives and data for the pause operation
   * @param done - Callback to invoke when pre-pause operations are complete
   * @throws {Error} Always throws since this method must be overridden
   */
  pause(bundle: Bundle, done: DoneWithResultCallback): void {
    void bundle;
    void done;
    throw new Error("Must override superclass method 'pause'");
  }
}
