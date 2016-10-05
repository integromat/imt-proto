'use strict'

/**
 * For API docummentation see ES6 version.
 */

global.IMTAccount = function() {
	function IMTAccount() {
		this.common = null;
		this.data = null;
	}

	IMTAccount.prototype.initialize = function initialize(done) {
		if ("function" === typeof done) done();
	}

	IMTAccount.prototype.finalize = function finalize(done) {
		if ("function" === typeof done) done();
	}

	IMTAccount.prototype.test = function test(done) {
		if ("function" === typeof done) done();
	}

	IMTAccount.prototype.validate = function validate(done) {
		if ("function" === typeof done) done();
	}
	
	return IMTAccount;
}();

global.IMTOAuthAccount = function(supr) {
	IMTOAuthAccount.inherits(supr);
	
	function IMTOAuthAccount() {
		IMTOAuthAccount.__super__.constructor.call(this);
	}

	IMTOAuthAccount.prototype.accountFromCallbackRequest = function accountFromCallbackRequest(req, done) {
		this.id = null;
		
		if ("function" === typeof done) done();
	}

	IMTOAuthAccount.prototype.authorize = function authorize(scope, done) {
		if ("function" === typeof done) done();
	}

	IMTOAuthAccount.prototype.callback = function callback(req, done) {
		if ("function" === typeof done) done();
	}

	IMTOAuthAccount.prototype.extendScope = function extendScope(scope, done) {
		if ("function" === typeof done) done();
	}

	IMTOAuthAccount.prototype.reauthorize = function reauthorize(done) {
		if ("function" === typeof done) done();
	}

	IMTOAuthAccount.prototype.invalidate = function invalidate(done) {
		if ("function" === typeof done) done();
	}
	
	return IMTOAuthAccount;
}(IMTAccount);
