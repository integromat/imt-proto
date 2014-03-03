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