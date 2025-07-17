/**
 * @module Feeder
 *
 * Feeder functionality for transforming input data into processable bundles.
 * Feeders convert single data items or arrays into standardized bundle formats.
 */

import { ModuleType } from './base';
import { IMTTransformer } from './transformer';
import type { Bundle, DoneWithResultCallback } from './types';

/**
 * Base class for all Feeders.
 *
 * A Feeder is responsible for transforming input data into individual bundles
 * that can be processed by downstream modules in the pipeline.
 *
 * @extends IMTTransformer
 */
export class IMTFeeder extends IMTTransformer {
  /**
   * The type of module this class represents.
   */
  public readonly type = ModuleType.FEEDER;

  /**
   * Transforms the input bundle into an array of bundles.
   * If the bundle already contains an array, it will process each item.
   * If not, it will wrap the item in an array.
   *
   * @param {Bundle} bundle - The collection of data to transform
   * @param {DoneWithResultCallback} done - Callback to invoke when transformation is complete
   */
  transform(bundle: Bundle, done: DoneWithResultCallback): void {
    // If bundle.array is not an array, wrap it in an array
    const bundleArray = Array.isArray(bundle.array) ? bundle.array : [bundle.array];

    // Invoke callback with the array result
    if (typeof done === 'function') {
      done(null, bundleArray);
    }
  }
}
