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

Reflect.defineProperty(Function.prototype, 'property', {
	value: function(prop, desc) {
		Reflect.defineProperty(this.prototype, prop, desc);
	}
})
