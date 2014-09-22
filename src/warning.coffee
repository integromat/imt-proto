###
Warning.

@param {String} message Warning message.

@property {String} stack Call stack.
@property {String} message Warning message.
###

class global.Warning
	constructor: (message) ->
		@name = @constructor.name
		@message = message

		Error.captureStackTrace @, @constructor

###
Warning JSON serialization.
###

Object.defineProperty Warning::, 'toJSON',
	enumerable: false
	writable: true
	value: ->
		json =
			name: @name
			message: @message
			stack: @stack
			
		json