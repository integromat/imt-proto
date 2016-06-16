/**
 * Base class for all Aggregators.
 */

global.IMTAggregator = class IMTAggregator extends IMTTransformer {
	constructor() {
		super();
		
		Reflect.defineProperty(this, 'type', {
			value: IMTBase.MODULETYPE_AGGREGATOR
		})
	}
};
