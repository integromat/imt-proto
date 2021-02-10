'use strict'

/**
 * For API docummentation see ES6 version.
 */

global.IMTPauser = function(supr) {
	IMTPauser.inherits(supr);

	function IMTPauser() {
		IMTPauser.__super__.constructor.call(this);

		this.type = IMTBase.MODULETYPE_PAUSER;
	}

	IMTPauser.prototype.pause = function pause(bundle, done) {
		throw new Error("Must override a superclass method 'pause'.");
	}

	return IMTPauser;
}(IMTBase);
