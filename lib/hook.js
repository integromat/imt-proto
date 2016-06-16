/**
 * Base class for all Hooks.
 */

global.IMTHook = class IMTHook {
	/**
	 * Initializes the hook. Function that overrides should always call super.
	 * 
	 * @callback done Callback to call when hook is initialized.
	 *     @param {Error} err Error on error, otherwise null.
	 */

	initialize(done) {
		if ("function" === typeof done) done();
	}

	/**
	 * Finalizes the hook. Function that overrides should always call super.
	 * 
	 * @callback done Callback to call when hook is finalized.
	 *     @param {Error} err Error on error, otherwise null.
	 */
	
	finalize(done) {
		if ("function" === typeof done) done();
	}

	/**
	 * Parse request.
	 * 
	 * @param {Request} req Request object.
	 * @callback done Callback to call when test is complete.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {Array} items Array of items parsed from request.
	 */

	parse(req, done) {
		throw new Error("Must override a superclass method 'parse'.");
	}
};
