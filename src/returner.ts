import { IMTBase, ModuleType } from './base';
import { Bundle, DoneWithResultCallback } from './types';

export class IMTReturner extends IMTBase {
  public readonly type = ModuleType.RETURNER;

  /**
   * Returns data.
   *
   * @param {Object} bundle Collection of data to process.
   * @callback done Callback to call when operations are done.
   *     @param {Error} err Error on error, otherwise null.
   *     @param {Bundle} bundle Collection of returned data.
   *
   */

  returnData(bundle: Bundle, done: DoneWithResultCallback): void {
    void bundle;
    void done;
    throw new Error("Must override a superclass method 'returnData'.");
  }
}
