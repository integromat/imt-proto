import { IMTBase, ModuleType } from './base';
import { Bundle, DoneWithInfoCallback } from './types';

/**
 * Base class for all Human-in-the-loop modules.
 */
export abstract class IMTHITL extends IMTBase {
	public readonly type: ModuleType = ModuleType.HITL;

	/**
	 * Executes the HITL flow.
	 *
	 * @param {Object} bundle Collection of data to process.
	 * @callback done Callback to call when operations are done.
	 *     @param {Error} err Error on error, otherwise null.
	 */

	abstract execute(bundle: Bundle, done: DoneWithInfoCallback): void;
}
