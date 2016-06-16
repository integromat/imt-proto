'use strict'

/**
 * For API docummentation see ES6 version.
 */

global.Warning = function() {
	function Warning(message) {
		this.name = 'Warning';
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}
	
	Object.defineProperties(Warning.prototype, {
		toString: {
			configurable: true,
			writable: true,
			value: function() {
				return this.name +': '+ this.message;
			}
		},
		inspect: {
			configurable: true,
			writable: true,
			value: function() {
				return '['+ this.name +': '+ this.message +']';
			}
		},
		toJSON: {
			configurable: true,
			writable: true,
			value: function() {
				return {
					name: this.name,
					message: this.message,
					stack: this.stack
				};
			}
		}
	})

	return Warning;
}();
