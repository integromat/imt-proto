import { IMTBase, ModuleType } from './base';
import { DoneCallback, DoneWithResultCallback } from './types';

/**
 * Base class for all Triggers.
 */

export class IMTTrigger extends IMTBase {
  public readonly type = ModuleType.TRIGGER;

  /**
   * Fetches data of a specific document. Used by webhooks.
   *
   * @param {Number} id Document id.
   * @callback done Callback to call when module is initialized.
   *     @param {Error} err Error on error, otherwise null.
   */

  fetch(id: number, done: DoneCallback): void {
    void id;
    void done;
    throw new Error("Must override a superclass method 'fetch'.");
  }

  /**
   * Reads data.
   *
   * @callback done Callback to call when operations are done.
   *     @param {Error} err Error on error, otherwise null.
   *     @param {Object|Array} bundle Collection of data read. Or batch of collections.
   */

  read(done: DoneWithResultCallback): void {
    void done;
    throw new Error("Must override a superclass method 'read'.");
  }
}

/**
 * Base Gateway Trigger.
 */

export class IMTGatewayTrigger extends IMTTrigger {}
