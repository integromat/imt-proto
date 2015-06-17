###
Base class for all Actions.
###

class global.IMTListener extends IMTTrigger
	type: IMTBase.MODULETYPE_LISTENER

	###
	Fetches data.
	
	@param {Object} data Data to fetch.
	@callback done Callback to call when operations are done.
		@param {Error} err Error on error, otherwise null.
		@param {Object|Array} bundle Collection of data read. Or batch of collections.
	###
	
	fetch: (data, done) ->
		done null, data

###
Base Gateway Listener.
###

class global.IMTGatewayListener extends IMTListener