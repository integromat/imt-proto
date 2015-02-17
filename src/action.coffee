###
Base class for all Actions.
###

class global.IMTAction extends IMTBase
	type: IMTBase.MODULETYPE_ACTION

	###
	Writes data.
	
	@param {Object} bundle Collection of data to process.
	@callback done Callback to call when operations are done.
		@param {Error} err Error on error, otherwise null.
	###

	write: (bundle, done) ->
		throw new Error "Must override a superclass method 'write'."

###
Base Gateway Action.
###

class global.IMTGatewayAction extends IMTAction