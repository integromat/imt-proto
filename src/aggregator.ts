import { ModuleType } from './base';
import { IMTTransformer } from './transformer';

/**
 * Base class for all Aggregators.
 */

export class IMTAggregator extends IMTTransformer {
  constructor() {
    super(ModuleType.AGGREGATOR);
  }
}
