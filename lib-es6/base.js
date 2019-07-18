'use strict'

const EventEmitter = require('events');
const util = require('util');

/**
 * Base class for all Modules.
 * 
 * @property {Object} scenario Collection of scenario parameters. Read only.
 * @property {Object} common Collection of common parameters. Read only.
 * @property {Object} data Collection of data specific to one concrete occurance of this module in Scenario.
 * @property {Object} parameters Collection of config parameters. Read only.
 * @property {Object} environment Collection of environment variables. Read only.
 * @property {Number} type Module type. Read only.
 * 
 * @event log Dispatched when message is about to be printed to info log.
 * @event warn Dispatched when message is about to be printed to warning log.
 */

global.IMTBase = class IMTBase extends EventEmitter {
	constructor() {
		super();
		
		this.common = null;
		this.data = null;
		this.parameters = null;
		this.scenario = null;
		this.environment = null;
		this.type = IMTBase.MODULETYPE_NONE;
	}
		
	/**
	 * Initializes the module. Function that overrides should always call super.
	 *
	 * @callback done Callback to call when module is initialized.
	 *     @param {Error} err Error on error, otherwise null.
	 */

	initialize(done) {
		if ("function" === typeof done) done();
	}

	/**
	 * Finalizes the module. Function that overrides should always call super.
	 * 
	 * @callback done Callback to call when module is finalized.
	 *     @param {Error} err Error on error, otherwise null.
	 */

	finalize(done) {
		this.removeAllListeners();
		if ("function" === typeof done) done();
	}

	/**
	 * Adds module to a shared transaction.
	 * 
	 * @param {Number} [id] Transaction ID. If omited, new transaction ID is generated.
	 * @return {Number} Transaction ID.
	 */

	addSharedTransaction(done) {
		throw new Error("Must override a superclass method 'addSharedTransaction'.");
	}

	/**
	 * Commit all operations.
	 * 
	 * @callback done Callback to call when operations are done.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {Array} report Commit report (see docs).
	 */

	commit(done) {
		if ("function" === typeof done) done(null, null);
	}

	/**
	 * Print debug message to Scenario info log. Debug messages are only visible to system administrators.
	 * 
	 * @param {...*} message Message to be printed to Scenario info log.
	 */

	debug() {
		this.emit('debug', Array.prototype.slice.call(arguments));
	}

	/**
	 * Print message to Scenario info log.
	 * 
	 * @param {...String|Warning|Error} message Message to be printed to Scenario info log.
	 */

	log() {
		if (arguments[0] instanceof Warning || arguments[0] instanceof Error) {
			this.emit('log', arguments[0]);
		} else {
			this.emit('log', util.format.apply(util, arguments));
		}
	}

	/**
	 * Reset the module so it can be reused again.
	 */

	reset() {}

	/**
	 * Rollback all operations.
	 * 
	 * @callback done Callback to call when operations are done.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {Array} report Rollback report (see docs).
	 */

	rollback(done) {
		if ("function" === typeof done) done(null, null);
	}

	/**
	 * Print message to Scenario warning log.
	 * 
	 * @param {...String} message Message to be printed to Scenario warning log.
	 */

	warn() {
		if (arguments[0] instanceof Warning || arguments[0] instanceof Error) {
			this.emit('warn', arguments[0]);
		} else {
			this.emit('warn', util.format.apply(util, arguments));
		}
	}
}

IMTBase.MODULETYPE_NONE = 0;
IMTBase.MODULETYPE_TRIGGER = 1;
IMTBase.MODULETYPE_TRANSFORMER = 2;
IMTBase.MODULETYPE_ROUTER = 3;
IMTBase.MODULETYPE_ACTION = 4;
IMTBase.MODULETYPE_LISTENER = 5;
IMTBase.MODULETYPE_FEEDER = 6;
IMTBase.MODULETYPE_AGGREGATOR = 7;
IMTBase.MODULETYPE_DIRECTIVE = 8;
IMTBase.MODULETYPE_CONVERGER = 9;
