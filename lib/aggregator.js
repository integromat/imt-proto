'use strict'

/**
 * Base class for all Aggregators.
 */

global.IMTAggregator = class IMTAggregator extends IMTTransformer {
	constructor() {
		super();
		
		Object.defineProperty(this, 'type', {
			value: IMTBase.MODULETYPE_AGGREGATOR
		})
	}
};
