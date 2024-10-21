import { IMTBase, ModuleType } from './base';
import { Bundle, DoneWithResultCallback } from './types';

/**
 * Base class for all Transformers.
 */

export class IMTTransformer extends IMTBase {
  public readonly type: ModuleType.TRANSFORMER | ModuleType.AGGREGATOR | ModuleType.FEEDER = ModuleType.TRANSFORMER;

  /**
   * Transforms data.
   *
   * @param {Object} bundle Collection of data to transform.
   * @callback done Callback to call when operations are done.
   * 	@param {Error} err Error on error, otherwise null.
   * 	@param {Object} bundle Collection of transformed data.
   */
  transform(bundle: Bundle, done: DoneWithResultCallback): void {
    void bundle;
    void done;
    throw new Error("Must override a superclass method 'transform'.");
  }
}
