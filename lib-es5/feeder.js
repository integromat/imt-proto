'use strict'

/**
 * For API docummentation see ES6 version.
 */

global.IMTFeeder = function(supr) {
	IMTFeeder.inherits(supr);

	function IMTFeeder() {
		IMTFeeder.__super__.constructor.call(this);

		this.type = IMTBase.MODULETYPE_FEEDER;
	}

	IMTFeeder.prototype.transform = function transform(bundle, done) {
		var array = bundle.array;
		if (!Array.isArray(array)) array = [array];
		if ('function' === typeof done) done(null, array);
	}

	return IMTFeeder;
}(IMTTransformer);
