'use strict'

/**
 * Warning.
 * 
 * @param {String} message Warning message.
 * 
 * @property {String} stack Call stack.
 * @property {String} message Warning message.
 */

global.Warning = class Warning {
	constructor(message) {
		this.name = 'Warning';
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}
};

/**
 * Warning toString.
 */

Reflect.defineProperty(Warning.prototype, 'toString', {
	configurable: true,
	writable: true,
	value() {
		return `${this.name}: ${this.message}`;
	}
});

/**
 * Warning inspect.
 */

Reflect.defineProperty(Warning.prototype, 'inspect', {
	configurable: true,
	writable: true,
	value() {
		return `[${this.name}: ${this.message}]`;
	}
});

/**
 * Warning JSON serialization.
 */

Reflect.defineProperty(Warning.prototype, 'toJSON', {
	configurable: true,
	writable: true,
	value() {
		return {
			name: this.name,
			message: this.message,
			stack: this.stack
		};
	}
});
