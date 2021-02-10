'use strict'

/**
 * Base class for all Feeders.
 */

global.IMTPauser = class IMTPauser extends IMTBase {
	constructor() {
		super();
		
		this.type = IMTBase.MODULETYPE_PAUSER;
	}
	
	/**
	 * Ininiates the pause operation.
	 * 
	 * @param {Object} bundle Collection of directives for pause.
	 * @callback done Callback to call when pre-pause operations are done.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {Object} bundle Collection of output data.
	 */

	pause(bundle, done) {
		throw new Error("Must override a superclass method 'pause'.");
	}
};
