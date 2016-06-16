/**
 * Base class for all Feeders.
 */

global.IMTFeeder = class IMTFeeder extends IMTTransformer {
	constructor() {
		super();
		
		this.type = IMTBase.MODULETYPE_FEEDER;
	}
	
	/**
	 * Transforms array into bundles.
	 * 
	 * @param {Object} bundle Collection of data to transform.
	 * @callback done Callback to call when operations are done.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {Object} bundle Collection of transformed data.
	 */

	transform(bundle, done) {
		let array = bundle.array;
		if (!Array.isArray(array)) array = [array];
		done(null, array);
	}
};
