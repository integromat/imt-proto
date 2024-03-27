import { DoneCallback, DoneWithFormCallback, DoneWithInfoCallback, DoneWithResultCallback } from './types';
import type { Request } from 'request';

export type Item = any;
export type HookData = any;

/**
 * Base class for all Hooks.
 *
 * @property {Object} data Collection of data specific to this hook. Read only.
 */

export class IMTHook {
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
   * @param {Request} request Request object.
   * @callback done Callback to call when test is complete.
   *     @param {Error} err Error on error, otherwise null.
   *     @param {Array} items Array of items parsed from request.
   */

  parse(request: Request, done: DoneWithResultCallback): void {
    void request;
    void done;
    throw new Error("Must override a superclass method 'parse'.");
  }
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

  /**
   * Builds the Form Specification.
   * If the Hook is capable of providing the Input Structure as the Form Specification,
   * this function will pass the specification to the callback.
   * Relies on the hook.data.
   * Used for Form Hooks.
   *
   * @param {Request} req Request object to make headers and stuff available inside
   * @callback done Callback to call when the Form is built.
   *     @param {Error} err Error on error, otherwise null.
   *     @param {Object} form The Form Specification
   */
  getFormSpec(req: Request, done: DoneWithFormCallback) {
    if ('function' === typeof done) done();
  }
}
