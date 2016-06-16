const EventEmitter = require('events');

/**
 * Base class for all Modules.
 * 
 * @property {Object} scenario Collection of scenario parameters. Read only.
 * @property {Object} common Collection of common parameters. Read only.
 * @property {Object} data Collection of data specific to one concrete occurance of this module in Scenario.
 * @property {Object} parameters Collection of config parameters. Read only.
 * @property {Number} type Module type.
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
	 * @param {...String} message Message to be printed to Scenario info log.
	 */

	debug() {
		if (arguments.length === 1 && 'object' === typeof arguments[0]) {
			this.emit('debug', arguments[0]);
		} else {
			this.emit('debug', require('util').format(...arguments));
		}
	}

	/**
	 * Print message to Scenario info log.
	 * 
	 * @param {...String} message Message to be printed to Scenario info log.
	 */

	log() {
		if (arguments[0] instanceof Warning || arguments[0] instanceof Error) {
			this.emit('log', arguments[0]);
		} else {
			this.emit('log', require('util').format(...arguments));
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
		this.emit('warn', require('util').format(...arguments));
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
