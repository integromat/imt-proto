import { DoneCallback, DoneWithInfoCallback } from './types';

export type Item = any;
export type HookData = any;

/**
 * Base class for all Hooks.
 *
 * @property {Object} data Collection of data specific to this hook. Read only.
 */

export abstract class IMTHook {
	/**
	 * Initializes the hook. Function that overrides should always call super.
	 *
	 * @callback done Callback to call when hook is initialized.
	 *     @param {Error} err Error on error, otherwise null.
	 */

	initialize(done: DoneCallback): void {
		if ('function' === typeof done) done();
	}

	/**
	 * Finalizes the hook. Function that overrides should always call super.
	 *
	 * @callback done Callback to call when hook is finalized.
	 *     @param {Error} err Error on error, otherwise null.
	 */

	finalize(done: DoneCallback): void {
		if ('function' === typeof done) done();
	}

	/**
	 * Parse request.
	 *
	 * @param {Request} req Request object.
	 * @callback done Callback to call when test is complete.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {Array} items Array of items parsed from request.
	 */

	abstract parse(req: Request, done: DoneCallback): void;
	/**
	 * Filter received items. Only effective in shared webhooks.
	 *
	 * @param {Object} Item
	 * @param {Object} Hook's data object.
	 * @callback done Callback to call when filter was resolved.
	 *     @param {Error} err Error on error, otherwise null.
	 *     @param {Boolean} passed Whether the item should be accepted.
	 */

	filter(item: Item, data: HookData, done: DoneWithInfoCallback): void {
		if ('function' === typeof done) done(null, true);
	}
}
