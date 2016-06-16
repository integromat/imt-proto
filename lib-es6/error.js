'use strict'

/**
 * Unknown Error. Used when non-instanceof-error error happens in program logic.
 * 
 * @param {*} err Original error.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.UnknownError = class UnknownError extends Error {
	constructor(err) {
		super();
		
		if ('object' === typeof err) {
			Object.assign(this, err);
			this.message = err.message || "<no message>";
		} else if ('string' === typeof err) {
			this.message = err;
		}
		
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}
	
	toJSON() {
		return Object.assign(super.toJSON(), this);
	}
}

/**
 * Runtime Error. Used when error happens in program logic, not in invalid data. Flow will be rolled back.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.RuntimeError = class RuntimeError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;
		
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Data Error. Used on invalid data. Bundle will be moved to DLQ. Process flow will be commited normally.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.DataError = class DataError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;
		
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Inconsistency Error. Used when commit/rollback fails. Process flow stops immediately. Commited data remain commited.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.InconsistencyError = class InconsistencyError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;
		
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Rate Limit Error. Used when API rate limit is exceeded.
 * 
 * **IMPORTANT**: Also freezes the scenario for some time.
 * 
 * @param {String} message Error message.
 * @param {Number} [delay] Delay in milliseconds. Optional, default is 20 minutes.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 * @property {Number} delay Delay in milliseconds.
 */

global.RateLimitError = class RateLimitError extends Error {
	constructor(message, delay) {
		super(message);
		
		this.name = this.constructor.name;
		this.delay = delay;
		
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Out Of Space Error. Used when service reports out of space.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.OutOfSpaceError = class OutOfSpaceError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Connection Error. Used when there is a problem with connection to the service.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.ConnectionError = class ConnectionError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Invalid Configuration Error. Used when configuration is broken and user interaction is required.
 * 
 * **IMPORTANT**: Also disables the scenario.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.InvalidConfigurationError = class InvalidConfigurationError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Invalid Access Token Error. Used when service access token is expired or invalid.
 * 
 * **IMPORTANT**: Also disables the scenario.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.InvalidAccessTokenError = class InvalidAccessTokenError extends InvalidConfigurationError {
	constructor(message) {
		super(message);
	}
}

/**
 * Invalid Access Token Error. Used when unexpected things occurs.
 * 
 * **IMPORTANT**: Also disables and lock the scenario. Staff revision is required in order to unlock the scenario.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.UnexpectedError = class UnexpectedError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;
		
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Max Results Exceeded Error. Used when limit of results was exceeded.
 * 
 * **IMPORTANT**: Also disables the scenario.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.MaxResultsExceededError = class MaxResultsExceededError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;
		
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Max File Size Exceeded Error. Used when limit of file size was exceeded.
 * 
 * **IMPORTANT**: Also disables the scenario.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.MaxFileSizeExceededError = class MaxFileSizeExceededError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;
		
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Incomplete Data Error. Used when received data are incomplete. 
 * 
 * @param {String} message Error message.
 * @param {Number} [delay] Delay in milliseconds. Optional.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 * @property {Number} delay Delay in milliseconds.
 */

global.IncompleteDataError = class IncompleteDataError extends Error {
	constructor(message, delay) {
		super(message);
		
		this.name = this.constructor.name;
		this.delay = delay;
		
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Duplicate Data Error. Used when service receives duplicate data. 
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.DuplicateDataError = class DuplicateDataError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;
		
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Module Timeout Error. Used when service module operation exceeds time limit.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.ModuleTimeoutError = class ModuleTimeoutError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;
		
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Scenario Timeout Error. Used when service scenario execution exceeds time limit.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.ScenarioTimeoutError = class ScenarioTimeoutError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;
		
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Used when processing of a scenario exceeds operations limit.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.OperationsLimitExceededError = class OperationsLimitExceededError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Used when processing of a scenario exceeds data size limit.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.DataSizeLimitExceededError = class DataSizeLimitExceededError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Used when execution is interrupted.
 * 
 * @param {String} message Error message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

global.ExecutionInterruptedError = class ExecutionInterruptedError extends Error {
	constructor(message) {
		super(message);
		
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Error JSON serialization.
 */

Reflect.defineProperty(Error.prototype, 'toJSON', {
	enumerable: false,
	writable: true,
	value() {
		let json = {
			name: this.name,
			message: this.message,
			stack: this.stack
		};

		if (this.hash != null) json.hash = this.hash;
		if (this.bundle != null) json.bundle = this.bundle;
		if (Array.isArray(this.suberrors)) json.suberrors = this.suberrors.map(item => item.toJSON());
		if (this.external != null) json.external = this.external;

		return json;
	}
})
