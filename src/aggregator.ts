import { ModuleType } from './base';
import { IMTTransformer } from './transformer';

/**
 * Base class for all Aggregators.
 */

export abstract class IMTAggregator extends IMTTransformer {
  protected constructor() {
    super(ModuleType.AGGREGATOR);
  }
}
