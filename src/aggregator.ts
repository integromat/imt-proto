/**
 * @module Aggregator
 *
 * Provides aggregator functionality for combining multiple data bundles into a single result.
 * Aggregators inherit from transformers and specialize in data consolidation operations.
 */

import { ModuleType } from './base';
import { IMTTransformer } from './transformer';

/**
 * Base class for all Aggregators.
 * Provides functionality for combining multiple data bundles into a single result.
 *
 * @class IMTAggregator
 * @extends IMTTransformer
 */
export class IMTAggregator extends IMTTransformer {
  public readonly type = ModuleType.AGGREGATOR;
}
