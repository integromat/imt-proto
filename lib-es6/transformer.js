'use strict'

/**
 * Base class for all Transformers.
 */

global.IMTTransformer = class IMTTransformer extends IMTBase {
	constructor() {
		super();
		
		this.type = IMTBase.MODULETYPE_TRANSFORMER;
	}
	
	/**
	 * Transforms data.
	 * 
	 * @param {Object} bundle Collection of data to transform.
	 * @callback done Callback to call when operations are done.
	 * 	@param {Error} err Error on error, otherwise null.
	 * 	@param {Object} bundle Collection of transformed data.
	 */

	transform(bundle, done) {
		throw new Error("Must override a superclass method 'transform'.");
	}
};
