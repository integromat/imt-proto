import { IMTBase, ModuleType } from './base';
import { Bundle, DoneWithInfoCallback } from './types';

export abstract class IMTAction extends IMTBase {
	public readonly type = ModuleType.ACTION;

	/**
	 * Writes data.
	 *
	 * @param {Object} bundle Collection of data to process.
	 * @callback done Callback to call when operations are done.
	 *     @param {Error} err Error on error, otherwise null.
	 */

	abstract write(bundle: Bundle, done: DoneWithInfoCallback): void;
}

/**
 * Base Gateway Action.
 */

export abstract class IMTGatewayAction extends IMTAction {}

/**
 * Base Gateway Responder.
 */

export abstract class IMTGatewayResponder extends IMTAction {}
