import { IMTBase, ModuleType } from './base';
import { Bundle, DoneWithResultCallback } from './types';

export class IMTAction extends IMTBase {
  public readonly type = ModuleType.ACTION;

  /**
   * Writes data.
   *
   * @param {Object} bundle Collection of data to process.
   * @callback done Callback to call when operations are done.
   *     @param {Error} err Error on error, otherwise null.
   */

  write(bundle: Bundle, done: DoneWithResultCallback): void {
    void bundle;
    void done;
    throw new Error("Must override a superclass method 'write'.");
  }
}

/**
 * Base Gateway Action.
 */

export class IMTGatewayAction extends IMTAction {}

/**
 * Base Gateway Responder.
 */

export class IMTGatewayResponder extends IMTAction {}
