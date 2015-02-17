###
Base class for all Triggers.
###

class global.IMTTrigger extends IMTBase
	
	type: IMTBase.MODULETYPE_TRIGGER
	
	###
	Initializes the module with WebHook request. Function that overrides should always call super.
	
	@param {*} req Collection of request data.
	@callback done Callback to call when module is initialized.
		@param {Error} err Error on error, otherwise null.
	###
	
	initializeWithRequest: (req, done) ->
		done?()
	
	###
	Reads data.
	
	@callback done Callback to call when operations are done.
		@param {Error} err Error on error, otherwise null.
		@param {Object|Array} bundle Collection of data read. Or batch of collections.
	###

	read: (done) ->
		throw new Error "Must override a superclass method 'read'."

###
Base Gateway Trigger.
###

class global.IMTGatewayTrigger extends IMTTrigger