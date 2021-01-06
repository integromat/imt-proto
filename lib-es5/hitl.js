'use strict'

/**
 * For API docummentation see ES6 version.
 */

global.IMTHITL = function(supr) {
	IMTHITL.inherits(supr);

	function IMTHITL() {
		IMTHITL.__super__.constructor.call(this);

		this.type = IMTBase.MODULETYPE_HITL;
	}

	IMTAction.prototype.execute = function execute(bundle, done) {
		throw new Error("Must override a superclass method 'execute'.");
	}

	return IMTHITL;
}(IMTBase);
