'use strict'

/**
 * For API docummentation see ES6 version.
 */

global.IMTAction = function(supr) {
	IMTAction.inherits(supr);

	function IMTAction() {
		IMTAction.__super__.constructor.call(this);

		this.type = IMTBase.MODULETYPE_ACTION;
	}

	IMTAction.prototype.write = function write(bundle, done) {
		throw new Error("Must override a superclass method 'write'.");
	}

	return IMTAction;
}(IMTBase);

global.IMTGatewayAction = function(supr) {
	IMTGatewayAction.inherits(supr);

	function IMTGatewayAction() {
		IMTGatewayAction.__super__.constructor.call(this);
	}

	return IMTGatewayAction;
}(IMTAction);
