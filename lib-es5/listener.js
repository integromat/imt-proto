'use strict'

/**
 * For API docummentation see ES6 version.
 */

global.IMTListener = function(supr) {
	IMTListener.inherits(supr);

	function IMTListener() {
		IMTBase.__super__.constructor.call(this);

		this.type = IMTBase.MODULETYPE_LISTENER;
	}
	
	IMTListener.prototype.start = function start(done) {
		throw new Error("Must override a superclass method 'start'.");
	}
	
	IMTListener.prototype.stop = function stop(done) {
		throw new Error("Must override a superclass method 'stop'.");
	}

	return IMTListener;
}(IMTBase);
