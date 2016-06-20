'use strict'

/**
 * For API docummentation see ES6 version.
 */

global.IMTTrigger = function(supr) {
	IMTTrigger.inherits(supr);

	function IMTTrigger() {
		IMTTrigger.__super__.constructor.call(this);

		this.type = IMTBase.MODULETYPE_TRIGGER;
	}
	
	IMTTrigger.prototype.fetch = function fetch(req, done) {
		throw new Error("Must override a superclass method 'fetch'.");
	}
	
	IMTTrigger.prototype.read = function read(done) {
		throw new Error("Must override a superclass method 'read'.");
	}

	return IMTTrigger;
}(IMTBase);

global.IMTGatewayTrigger = function(supr) {
	IMTGatewayTrigger.inherits(supr);

	function IMTGatewayTrigger() {
		IMTGatewayTrigger.__super__.constructor.call(this);
	}

	return IMTGatewayTrigger;
}(IMTTrigger);
