/**
 * @module Transformer
 *
 * Provides transformation functionality for modifying and processing data bundles.
 * Transformers are the core processing units that manipulate data between flow stages.
 */

import { IMTBase, ModuleType } from './base';
import type { Bundle, DoneWithResultCallback } from './types';

/**
 * Base class for all Transformer modules.
 *
 * Transformers are responsible for modifying, enriching, or reformatting data
 * as it flows through the scenario pipeline. They serve as the primary data
 * processing units and can perform operations like filtering, mapping,
 * validation, and format conversion.
 */
export class IMTTransformer extends IMTBase {
  public readonly type: ModuleType.TRANSFORMER | ModuleType.AGGREGATOR | ModuleType.FEEDER = ModuleType.TRANSFORMER;

  /**
   * Transforms the input data bundle.
   *
   * This method must be overridden by subclasses to implement specific
   * transformation logic such as data mapping, filtering, validation,
   * format conversion, or enrichment operations.
   *
   * @param bundle - Collection of data to transform
   * @param done - Callback to invoke when transformation is complete
   * @throws {Error} Always throws since this method must be overridden
   */
  transform(bundle: Bundle, done: DoneWithResultCallback): void {
    void bundle;
    void done;
    throw new Error("Must override superclass method 'transform'");
  }
}
