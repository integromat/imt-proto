'use strict';

import { DoneCallback } from './types';
import { IMTBase, ModuleType } from './base';

/**
 * Base class for all Listeners.
 *
 * @event data Module dispatches this event on new data.
 */

export abstract class IMTListener extends IMTBase {
	public readonly type = ModuleType.LISTENER;

	/**
	 * Start listening for new data.
	 *
	 * @callback done Callback to call when listener is ready and listening.
	 *     @param {Error} err Error on error, otherwise null.
	 */

	abstract start(done: DoneCallback): void;

	/**
	 * Stop listening for new data.
	 *
	 * @callback done Callback to call when listener has stopped.
	 *     @param {Error} err Error on error, otherwise null.
	 */

	abstract stop(done: DoneCallback): void;
}
