'use strict'

/**
 * For API docummentation see ES6 version.
 */

Object.defineProperty(Function.prototype, 'property', {
	writable: true,
	configurable: true,
	value: function(prop, desc) {
		Object.defineProperty(this.prototype, prop, desc);
	}
})

Object.defineProperty(Function.prototype, 'inherits', {
	writable: true,
	configurable: true,
	value: function(parent) {
		var child = this;
		
		for (var key in parent) {
			if (Object.prototype.hasOwnProperty.call(parent, key)) child[key] = parent[key];
		}
		
		function ctor() {
			this.constructor = child;
		}
		
		ctor.prototype = parent.prototype;
		child.prototype = new ctor();
		child.__super__ = parent.prototype;
		return child;
	}
})
