###
Simplified property definition for CoffeeScript.

```
class MyClass
    @property 'status',
        get: ->
        set: ->
```
###

Function::property = (prop, desc) ->
	Object.defineProperty @::, prop, desc

###
The Array.of() method creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments.

@param {...Object} element Elements of which to create the array.
@returns {Array}
###

Array.of ?= ->
	Array::slice.call arguments