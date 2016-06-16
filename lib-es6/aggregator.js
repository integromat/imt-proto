'use strict'

/**
 * Base class for all Aggregators.
 */

global.IMTAggregator = class IMTAggregator extends IMTTransformer {
	constructor() {
		super();
		
		this.type = IMTBase.MODULETYPE_AGGREGATOR;
	}
};
