'use strict'

/**
 * For API docummentation see ES6 version.
 */

global.IMTTransformer = function(supr) {
	IMTTransformer.inherits(supr);

	function IMTTransformer() {
		IMTTransformer.__super__.constructor.call(this);

		this.type = IMTBase.MODULETYPE_TRANSFORMER;
	}

	IMTTransformer.prototype.transform = function transform(bundle, done) {
		throw new Error("Must override a superclass method 'transform'.");
	}

	return IMTTransformer;
}(IMTBase);
