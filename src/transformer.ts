import { IMTBase, ModuleType } from './base';
import { Bundle, DoneCallback } from './types';

/**
 * Base class for all Transformers.
 */

export abstract class IMTTransformer extends IMTBase {
  public readonly type;

  constructor(type = ModuleType.TRANSFORMER) {
    super();
    this.type = type;
  }

  /**
   * Transforms data.
   *
   * @param {Object} bundle Collection of data to transform.
   * @callback done Callback to call when operations are done.
   * 	@param {Error} err Error on error, otherwise null.
   * 	@param {Object} bundle Collection of transformed data.
   */
  abstract transform(bundle: Bundle, done: DoneCallback): void;
}
