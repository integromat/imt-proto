'use strict'

/**
 * For API docummentation see ES6 version.
 */

var EventEmitter = require('events');
var util = require('util');

global.IMTBase = function(supr) {
	IMTBase.inherits(supr);
	
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
	IMTBase.MODULETYPE_HITL = 10;
	IMTBase.MODULETYPE_PAUSER = 11;

	function IMTBase() {
		IMTBase.__super__.constructor.call(this);
		
		this.common = null;
		this.data = null;
		this.parameters = null;
		this.scenario = null;
		this.environment = null;
		this.type = IMTBase.MODULETYPE_NONE;
	}

	IMTBase.prototype.initialize = function initialize(done) {
		if ("function" === typeof done) done();
	}

	IMTBase.prototype.finalize = function finalize(done) {
		this.removeAllListeners();
		if ("function" === typeof done) done();
	}

	IMTBase.prototype.addSharedTransaction = function addSharedTransaction() {
		throw new Error("Must override a superclass method 'addSharedTransaction'.");
	}

	IMTBase.prototype.commit = function commit(done) {
		if ("function" === typeof done) done(null, null);
	}

	IMTBase.prototype.debug = function debug() {
		this.emit('debug', Array.prototype.slice.call(arguments));
	}

	IMTBase.prototype.log = function log() {
		if (arguments[0] instanceof Warning || arguments[0] instanceof Error) {
			this.emit('log', arguments[0]);
		} else {
			this.emit('log', util.format.apply(util, arguments));
		}
	}

	IMTBase.prototype.reset = function reset() {}

	IMTBase.prototype.rollback = function rollback(done) {
		if ("function" === typeof done) done(null, null);
	}
	
	IMTBase.prototype.warn = function warn() {
		if (arguments[0] instanceof Warning || arguments[0] instanceof Error) {
			this.emit('log', arguments[0]);
		} else {
			this.emit('log', util.format.apply(util, arguments));
		}
	}

	return IMTBase;
}(EventEmitter);
