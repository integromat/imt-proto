'use strict'

/**
 * Base class for all Triggers.
 */

global.IMTTrigger = class IMTTrigger extends IMTBase {
	constructor() {
		super();
		
		this.type = IMTBase.MODULETYPE_TRIGGER;
	}
	
	/**
	 * Fetches data of a specific document. Used by webhooks.
	 * 
	 * @param {Number} id Document id.
	 * @callback done Callback to call when module is initialized.
	 *     @param {Error} err Error on error, otherwise null.
	 */
	
	fetch(id, done) {
		throw new Error("Must override a superclass method 'fetch'.");
	}
	
	/**
	 * Reads data.
	 * 
	 * @callback done Callback to call when operations are done.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {Object|Array} bundle Collection of data read. Or batch of collections.
	 */

	read(done) {
		throw new Error("Must override a superclass method 'read'.");
	}
};

/**
 * Base Gateway Trigger.
 */

global.IMTGatewayTrigger = class IMTGatewayTrigger extends IMTTrigger {};
