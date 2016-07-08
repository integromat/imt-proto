'use strict'

/**
 * Base class for all Listeners.
 *
 * @event data Module dispatches this event on new data.
 */

global.IMTListener = class IMTListener extends IMTBase {
	constructor() {
		super();
		
		this.type = IMTBase.MODULETYPE_LISTENER;
	}
	
	/**
	 * Start listening for new data.
	 * 
	 * @callback done Callback to call when listener is ready and listening.
	 *     @param {Error} err Error on error, otherwise null.
	 */
	
	start(done) {
		throw new Error("Must override a superclass method 'start'.");
	}
	
	/**
	 * Stop listening for new data.
	 * 
	 * @callback done Callback to call when listener has stopped.
	 *     @param {Error} err Error on error, otherwise null.
	 */

	stop(done) {
		throw new Error("Must override a superclass method 'stop'.");
	}
};
