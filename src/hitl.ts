/**
 * @module HITL
 *
 * Human-in-the-loop functionality for scenarios requiring manual intervention.
 * HITL modules pause scenario execution to wait for human input or approval.
 */

import { IMTBase, ModuleType } from './base';
import type { Bundle, DoneWithInfoCallback } from './types';

/**
 * Base class for all Human-in-the-loop modules.
 *
 * This class provides the foundation for modules that require human intervention
 * during the processing pipeline. All HITL implementations must override the
 * execute method to provide their specific functionality.
 */
export class IMTHITL extends IMTBase {
  /**
   * The module type identifier for Human-in-the-loop modules.
   */
  public readonly type = ModuleType.HITL;

  /**
   * Executes the HITL flow.
   *
   * This method must be overridden by subclasses to implement the specific
   * human-in-the-loop functionality required for the module.
   *
   * @param bundle - Collection of data to process
   * @param done - Callback to call when operations are complete
   * @throws {Error} Always throws as this method must be overridden
   */
  execute(bundle: Bundle, done: DoneWithInfoCallback): void {
    void bundle;
    void done;
    throw new Error("Must override the superclass method 'execute'");
  }
}
