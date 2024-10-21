import { IMTBase, ModuleType } from './base';
import { Bundle, DoneWithInfoCallback } from './types';

/**
 * Base class for all Human-in-the-loop modules.
 */
export class IMTHITL extends IMTBase {
  public readonly type = ModuleType.HITL;

  /**
   * Executes the HITL flow.
   *
   * @param {Object} bundle Collection of data to process.
   * @callback done Callback to call when operations are done.
   *     @param {Error} err Error on error, otherwise null.
   */

  execute(bundle: Bundle, done: DoneWithInfoCallback): void {
    void bundle;
    void done;
    throw new Error("Must override a superclass method 'execute'.");
  }
}
