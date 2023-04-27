import { ModuleType } from './base';
import { IMTTransformer } from './transformer';
import { Bundle, DoneWithResultCallback } from './types';

/**
 * Base class for all Feeders.
 */

export abstract class IMTFeeder extends IMTTransformer {
	public readonly type = ModuleType.FEEDER;

	/**
	 * Transforms array into bundles.
	 *
	 * @param {Object} bundle Collection of data to transform.
	 * @callback done Callback to call when operations are done.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {Object} bundle Collection of transformed data.
	 */

	transform(bundle: Bundle, done: DoneWithResultCallback) {
		let array = bundle.array;
		if (!Array.isArray(array)) array = [array];
		if ('function' === typeof done) done(null, array);
	}
}
