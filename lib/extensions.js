'use strict'

/**
 * Simplified property definition for CoffeeScript.
 * 
 * ```
 * class MyClass
 *     @property 'status',
 *         get: ->
 *         set: ->
 * ```
 */

Object.defineProperty(Function.prototype, 'property', {
	value: function(prop, desc) {
		Object.defineProperty(this.prototype, prop, desc);
	}
})
