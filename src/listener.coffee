###
Base class for all Actions.

@property {Boolean} listening True, if module is listening.

@event data Dispatched on new data.
@event error Dispatched on error.
###

class global.IMTListener extends IMTTrigger
	type: IMTBase.MODULETYPE_LISTENER
	listening: false
	
	###
	Finalizes the module. Function that overrides should always call super.
	
	@callback done Callback to call when module is finalized.
		@param {Error} err Error on error, otherwise null.
	###
	
	finalize: (done) ->
		if @listening then @stop()
		
		super()
		done?()
	
	###
	Start listening for data.
	###
	
	listen: ->
		throw new Error "Must override a superclass method 'listen'."
	
	###
	Don't use this function with Listeners!
	###
	
	read: ->
		throw new Error "Listeners can't 'read', use 'listen' instead."

	###
	Stop listening for data.
	###
	
	stop: ->
		throw new Error "Must override a superclass method 'stop'."