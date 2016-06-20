'use strict'

/**
 * For API docummentation see ES6 version.
 */

var EventEmitter = require('events');

global.IMTRPC = function(supr) {
	IMTRPC.inherits(supr);

	function IMTRPC() {
		IMTRPC.__super__.constructor.call(this);

		this.common = null;
		this.parameters = null;
		this.environment = null;
	}

	IMTRPC.prototype.initialize = function initialize(done) {
		if ("function" === typeof done) done();
	}

	IMTRPC.prototype.finalize = function finalize(done) {
		if ("function" === typeof done) done();
	}

	IMTRPC.prototype.execute = function execute(done) {
		throw new Error("Must override a superclass method 'execute'.");
	}

	return IMTRPC;
}(EventEmitter);
