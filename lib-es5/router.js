'use strict'

/**
 * For API docummentation see ES6 version.
 */

global.IMTRouter = function(supr) {
	IMTRouter.inherits(supr);

	function IMTRouter() {
		IMTRouter.__super__.constructor.call(this);

		this.type = IMTBase.MODULETYPE_ROUTER;
	}

	return IMTRouter;
}(IMTBase);
