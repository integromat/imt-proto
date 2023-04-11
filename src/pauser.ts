import { IMTBase, ModuleType } from './base';
import { Bundle, DoneCallback } from './types';

/**
 * Base class for all Feeders.
 */

export abstract class IMTPauser extends IMTBase {
	public readonly type = ModuleType.PAUSER;

	/**
	 * Ininiates the pause operation.
	 *
	 * @param {Object} bundle Collection of directives for pause.
	 * @callback done Callback to call when pre-pause operations are done.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {Object} bundle Collection of output data.
	 */

	abstract pause(bundle: Bundle, done: DoneCallback): void;
}
