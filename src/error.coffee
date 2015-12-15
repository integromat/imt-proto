###
Unknown Error. Used when non-instanceof-error error happens in program logic.

@param {*} err Original error.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.UnknownError extends Error
	constructor: (err) ->
		if typeof err is 'object'
			@[k] = v for k, v of err
			@message = err.message ? "<no message>"

		else if typeof err is 'string'
			@message = err
		
		@name = @constructor.name
		
		super()
		Error.captureStackTrace @, @constructor
	
	toJSON: ->
		json = super()
		json[k] = v for k, v of @
		json

###
Runtime Error. Used when error happens in program logic, not in invalid data. Flow will be rolled back.

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.RuntimeError extends Error
	constructor: (message) ->
		@name = @constructor.name
		@message = message
		
		super()
		Error.captureStackTrace @, @constructor

###
Data Error. Used on invalid data. Bundle will be moved to DLQ. Process flow will be commited normally.

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.DataError extends Error
	constructor: (message) ->
		@name = @constructor.name
		@message = message
		
		super()
		Error.captureStackTrace @, @constructor

###
Inconsistency Error. Used when commit/rollback fails. Process flow stops immediately. Commited data remain commited.

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.InconsistencyError extends Error
	constructor: (message) ->
		@name = @constructor.name
		@message = message
		
		super()
		Error.captureStackTrace @, @constructor

###
Rate Limit Error. Used when API rate limit is exceeded.

**IMPORTANT**: Also freezes the scenario for some time.

@param {String} message Error message.
@param {Number} [delay] Delay in milliseconds. Optional, default is 20 minutes.

@property {String} stack Call stack.
@property {String} message Error message.
@property {Number} delay Delay in milliseconds.
###

class global.RateLimitError extends Error
	constructor: (message, delay) ->
		@name = @constructor.name
		@message = message
		@delay = delay
		
		super()
		Error.captureStackTrace @, @constructor

###
Out Of Space Error. Used when service reports out of space.

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.OutOfSpaceError extends Error
	constructor: (message) ->
		@name = @constructor.name
		@message = message
		
		super()
		Error.captureStackTrace @, @constructor

###
Connection Error. Used when there is a problem with connection to the service.

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.ConnectionError extends Error
	constructor: (message) ->
		@name = @constructor.name
		@message = message
		
		super()
		Error.captureStackTrace @, @constructor

###
Invalid Configuration Error. Used when configuration is broken and user interaction is required.

**IMPORTANT**: Also disables the scenario.

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.InvalidConfigurationError extends Error
	constructor: (message) ->
		@name = @constructor.name
		@message = message
		
		super()
		Error.captureStackTrace @, @constructor

###
Invalid Access Token Error. Used when service access token is expired or invalid.

**IMPORTANT**: Also disables the scenario.

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.InvalidAccessTokenError extends InvalidConfigurationError
	constructor: (message) ->
		super message

###
Invalid Access Token Error. Used when unexpected things occurs.

**IMPORTANT**: Also disables and lock the scenario. Staff revision is required in order to unlock the scenario.

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.UnexpectedError extends Error
	constructor: (message) ->
		@name = @constructor.name
		@message = message
		
		super()
		Error.captureStackTrace @, @constructor

###
Max Results Exceeded Error. Used when limit of results was exceeded.

**IMPORTANT**: Also disables the scenario.

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.MaxResultsExceededError extends Error
	constructor: (message) ->
		@name = @constructor.name
		@message = message
		
		super()
		Error.captureStackTrace @, @constructor

###
Max File Size Exceeded Error. Used when limit of file size was exceeded.

**IMPORTANT**: Also disables the scenario.

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.MaxFileSizeExceededError extends Error
	constructor: (message) ->
		@name = @constructor.name
		@message = message
		
		super()
		Error.captureStackTrace @, @constructor

###
Incomplete Data Error. Used when received data are incomplete. 

@param {String} message Error message.
@param {Number} [delay] Delay in milliseconds. Optional.

@property {String} stack Call stack.
@property {String} message Error message.
@property {Number} delay Delay in milliseconds.
###

class global.IncompleteDataError extends Error
	constructor: (message, delay) ->
		@name = @constructor.name
		@message = message
		@delay = delay
		
		super()
		Error.captureStackTrace @, @constructor

###
Duplicate Data Error. Used when service receives duplicate data. 

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.DuplicateDataError extends Error
	constructor: (message) ->
		@name = @constructor.name
		@message = message
		
		super()
		Error.captureStackTrace @, @constructor

###
Module Timeout Error. Used when service module operation exceeds time limit.

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.ModuleTimeoutError extends Error
	constructor: (message) ->
		@name = @constructor.name
		@message = message
		
		super()
		Error.captureStackTrace @, @constructor

###
Scenario Timeout Error. Used when service scenario execution exceeds time limit.

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.ScenarioTimeoutError extends Error
	constructor: (message) ->
		@name = @constructor.name
		@message = message
		
		super()
		Error.captureStackTrace @, @constructor

###
Used when processing of a scenario exceeds operations limit.

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.OperationsLimitExceededError extends Error
	constructor: (message) ->
		@name = @constructor.name
		@message = message
		
		super()
		Error.captureStackTrace @, @constructor

###
Used when processing of a scenario exceeds data size limit.

@param {String} message Error message.

@property {String} stack Call stack.
@property {String} message Error message.
###

class global.DataSizeLimitExceededError extends Error
	constructor: (message) ->
		@name = @constructor.name
		@message = message
		
		super()
		Error.captureStackTrace @, @constructor

###
Error JSON serialization.
###

Object.defineProperty Error::, 'toJSON',
	enumerable: false
	writable: true
	value: ->
		json =
			name: @name
			message: @message
			stack: @stack
		
		json.imtExceptionHash = @imtExceptionHash if @imtExceptionHash?
		json.suberrors = @suberrors if Array.isArray @suberrors
			
		json
