'use strict'

const EventEmitter = require('events');

/**
 * Base class for RPC.
 * 
 * @property {Object} common Collection of common parameters. Read only.
 * @property {Object} environment Collection of environment parameters. Read only.
 * @property {Object} parameters Collection of config parameters. Read only.
 */

global.IMTRPC = class IMTRPC extends EventEmitter {
	constructor() {
		this.common = null;
		this.parameters = null;
		this.environment = null;
	}

	/**
	 * Initializes the RPC. Function that overrides should always call super.
	 * 
	 * @callback done Callback to call when RPC is initialized.
	 *     @param {Error} err Error on error, otherwise null.
	 */

	initialize(done) {
		if ("function" === typeof done) done();
	}

	/**
	 * Finalizes the RPC. Function that overrides should always call super.
	 * 
	 * @callback done Callback to call when RPC is finalized.
	 *     @param {Error} err Error on error, otherwise null.
	 */

	finalize(done) {
		if ("function" === typeof done) done();
	}

	/**
	 * Executes the RPC.
	 * 
	 * @callback done Callback to call when RPC is done.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {Object} response RPC response.
	 */

	execute(done) {
		throw new Error("Must override a superclass method 'execute'.");
	}

	/**
	 * Print debug message to Scenario info log. Debug messages are only visible to system administrators.
	 * 
	 * @param {...*} message Message to be printed to Scenario info log.
	 */

	debug() {
		throw new Error("Must override a superclass method 'debug'.");
	}
}
