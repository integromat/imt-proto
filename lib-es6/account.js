'use strict'

/**
 * Base class for all Accounts.
 * 
 * @property {Object} common Collection of common parameters. Read only.
 * @property {Object} data Collection of config parameters.
 */

global.IMTAccount = class IMTAccount {
	constructor() {
		this.common = null;
		this.data = null;
	}
	
	/**
	 * Initializes the account. Function that overrides should always call super.
	 * 
	 * @callback done Callback to call when account is initialized.
	 * 	@param {Error} err Error on error, otherwise null.
	 */

	initialize(done) {
		if ("function" === typeof done) done();
	}

	/**
	 * Finalizes the account. Function that overrides should always call super.
	 * 
	 * @callback done Callback to call when account is finalized.
	 *     @param {Error} err Error on error, otherwise null.
	 */
	
	finalize(done) {
		if ("function" === typeof done) done();
	}
		
	/**
	 * Test account connection.
	 * 
	 * @callback done Callback to call when test is complete.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {Boolean} valid True if account is valid.
	 */
		
	test(done) {
		if ("function" === typeof done) done();
	}
		
	/**
	 * Test account validity.
	 * 
	 * @callback done Callback to call when validation is complete.
	 *     @param {Error} err Error on error, otherwise null.
	 */
		
	validate(done) {
		if ("function" === typeof done) done();
	}
};

/*
Base class for all OAuth Accounts.
*/

global.IMTOAuthAccount = class IMTOAuthAccount extends IMTAccount {
	/**
	 * Sets account ID by received data.
	 * 
	 * @param {stream.Readdable} req HTTP request stream.
	 */
	
	accountFromCallbackRequest(req) {
		this.id = null;
	}
	
	/**
	 * Create authorization request and redirect user to OAuth provider.
	 * 
	 * @param {Array} scope Array of permission to request.
	 * @callback done Callback to call when authorization request is ready.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {String} url URL to redirect user to.
	 */
	
	authorize(scope, done) {
		if ("function" === typeof done) done();
	}
	
	/**
	 * Callback from OAuth provider.
	 * 
	 * @param {stream.Readdable} req HTTP request stream.
	 * @callback done Callback to call when authorization request is ready.
	 *     @param {Error} err Error on error, otherwise null.
	 */
	
	callback(req, done) {
		if ("function" === typeof done) done();
	}
	
	/**
	 * Create scope extension request and redirect user to OAuth provider.
	 * 
	 * @param {Array} scope Array of permission to request.
	 * @callback done Callback to call when authorization request is ready.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {String} url URL to redirect user to.
	 */
	
	extendScope(scope, done) {
		if ("function" === typeof done) done();
	}
	
	/**
	 * Create reauthorization request and redirect user to OAuth provider.
	 * 
	 * @callback done Callback to call when authorization request is ready.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {String} url URL to redirect user to.
	 */
	
	reauthorize(done) {
		if ("function" === typeof done) done();
	}
};
