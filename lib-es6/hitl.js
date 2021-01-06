'use strict'

/**
 * Base class for all Human-in-the-loop modules.
 */
class IMTHITL extends IMTBase {
	constructor() {
		super();
		
		this.type = IMTBase.MODULETYPE_HITL;
	}

	/**
	 * Executes the HITL flow.
	 * 
	 * @param {Object} bundle Collection of data to process.
	 * @callback done Callback to call when operations are done.
	 *     @param {Error} err Error on error, otherwise null.
	 */

	execute(bundle, done) {
		throw new Error("Must override a superclass method 'execute'.");
	}
};
