'use strict'

/**
 * For API docummentation see ES6 version.
 */

global.IMTHook = function() {
	function IMTHook() {}

	IMTHook.prototype.initialize = function initialize(done) {
		if ("function" === typeof done) done();
	}

	IMTHook.prototype.finalize = function finalize(done) {
		if ("function" === typeof done) done();
	}

	IMTHook.prototype.parse = function parse(req, done) {
		throw new Error("Must override a superclass method 'parse'.");
	}

	IMTHook.prototype.filter = function filter(item, data, done) {
		if ("function" === typeof done) done(null, true);
	}
	
	return IMTHook;
}();
