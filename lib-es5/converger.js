'use strict'

/**
 * For API docummentation see ES6 version.
 */

global.IMTConverger = function(supr) {
	IMTConverger.inherits(supr);

	function IMTConverger() {
		IMTConverger.__super__.constructor.call(this);

		this.type = IMTBase.MODULETYPE_CONVERGER;
	}

	return IMTConverger;
}(IMTBase);
