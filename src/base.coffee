{EventEmitter} = require 'events'

###
Base class for all Modules.

@property {Object} scenario Collection of scenario parameters. Read only.
@property {Object} common Collection of common parameters. Read only.
@property {Object} data Collection of data specific to one concrete occurance of this module in Scenario.
@property {Object} parameters Collection of config parameters. Read only.
@property {Number} type Module type.

@event log Dispatched when message is about to be printed to info log.
@event warn Dispatched when message is about to be printed to warning log.
###

class global.IMTBase extends EventEmitter
	@MODULETYPE_NONE: 0
	@MODULETYPE_TRIGGER: 1
	@MODULETYPE_TRANSFORMER: 2
	@MODULETYPE_ROUTER: 3
	@MODULETYPE_ACTION: 4
	@MODULETYPE_LISTENER: 5
	
	common: null
	data: null
	parameters: null
	type: @MODULETYPE_NONE
	
	###
	Initializes the module. Function that overrides should always call super.
	
	@callback done Callback to call when module is initialized.
		@param {Error} err Error on error, otherwise null.
	###
	
	initialize: (done) ->
		done?()
		
	###
	Finalizes the module. Function that overrides should always call super.
	
	@callback done Callback to call when module is finalized.
		@param {Error} err Error on error, otherwise null.
	###
	
	finalize: (done) ->
		@removeAllListeners()
		
		done?()

	###
	Commit all operations.
	
	@callback done Callback to call when operations are done.
		@param {Error} err Error on error, otherwise null.
		@param {Array} report Commit report (see docs).
	###

	commit: (done) ->
		done? null, null
	
	###
	Print message to Scenario info log.
	
	@param {String} message Message to be printed to Scenario info log.
	###
	
	log: (message...) ->
		@emit 'log', message.join ' '

	###
	Rollback all operations.
	
	@callback done Callback to call when operations are done.
		@param {Error} err Error on error, otherwise null.
		@param {Array} report Rollback report (see docs).
	###
	
	rollback: (done) ->
		done? null, null
		
	###
	Print message to Scenario warning log.
	
	@param {String} message Message to be printed to Scenario warning log.
	###
	
	warn: (message...) ->
		@emit 'warn', message.join ' '