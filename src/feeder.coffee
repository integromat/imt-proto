###
Base class for all Feeders.
###

class global.IMTFeeder extends IMTTransformer
	
	type: IMTBase.MODULETYPE_FEEDER
	
	###
	Transforms array into bundles.
	
	@param {Object} bundle Collection of data to transform.
	@callback done Callback to call when operations are done.
		@param {Error} err Error on error, otherwise null.
		@param {Object} bundle Collection of transformed data.
	###

	transform: (bundle, done) ->
		array = bundle.array
		if not Array.isArray array then array = [array]
		
		done? null, array