'use strict'

/**
 * For API docummentation see ES6 version.
 */

global.IMTAggregator = function(supr) {
	IMTAggregator.inherits(supr);

	function IMTAggregator() {
		IMTAggregator.__super__.constructor.call(this);

		this.type = IMTBase.MODULETYPE_AGGREGATOR;
	}

	return IMTAggregator;
}(IMTTransformer);
