import { IMTBase, ModuleType } from './base';
import { Bundle, DoneWithResultCallback } from './types';

/**
 * Base class for all Feeders.
 */

export class IMTPauser extends IMTBase {
  public readonly type = ModuleType.PAUSER;

  /**
   * Ininiates the pause operation.
   *
   * @param {Object} bundle Collection of directives for pause.
   * @callback done Callback to call when pre-pause operations are done.
   *     @param {Error} err Error on error, otherwise null.
   *     @param {Object} bundle Collection of output data.
   */

  pause(bundle: Bundle, done: DoneWithResultCallback): void {
    void bundle;
    void done;
    throw new Error("Must override a superclass method 'pause'.");
  }
}
