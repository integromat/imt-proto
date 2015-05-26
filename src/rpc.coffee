{EventEmitter} = require 'events'

###
Base class for RPC.

@property {Object} common Collection of common parameters. Read only.
@property {Object} environment Collection of environment parameters. Read only.
@property {Object} parameters Collection of config parameters. Read only.
###

class global.IMTRPC extends EventEmitter
	common: null
	parameters: null
	environment: null
	
	###
	Initializes the RPC. Function that overrides should always call super.
	
	@callback done Callback to call when RPC is initialized.
		@param {Error} err Error on error, otherwise null.
	###
	
	initialize: (done) ->
		done?()
		
	###
	Finalizes the RPC. Function that overrides should always call super.
	
	@callback done Callback to call when RPC is finalized.
		@param {Error} err Error on error, otherwise null.
	###
	
	finalize: (done) ->
		done?()
	
	###
	Executes the RPC.
	
	@callback done Callback to call when RPC is done.
		@param {Error} err Error on error, otherwise null.
		@param {Object} response RPC response.
	###

	execute: (done) ->
		throw new Error "Must override a superclass method 'execute'."