/**
 * @module Action
 *
 * Action modules for executing operations and interacting with external services.
 * Actions are the primary execution units that perform work in scenario flows.
 */

import { IMTBase, ModuleType } from './base';
import type { Bundle, DoneWithResultCallback } from './types';

/**
 * The most basic module for executing actions.
 *
 * @class IMTAction
 * @extends IMTBase
 */
export class IMTAction extends IMTBase {
  public readonly type = ModuleType.ACTION;

  /**
   * Executes the action on the provided data bundle.
   *
   * @param bundle - Collection of data to process
   * @param done - Callback executed when processing completes
   * @throws {Error} Throws error if not implemented by child class
   */
  public write(bundle: Bundle, done: DoneWithResultCallback): void {
    void bundle;
    void done;
    throw new Error('IMTAction.write() must be implemented by child class');
  }
}

/**
 * Base Gateway Action for handling gateway-specific operations.
 *
 * @class IMTGatewayAction
 * @extends IMTAction
 */
export class IMTGatewayAction extends IMTAction {}

/**
 * Base Gateway Responder for handling responses from gateway.
 *
 * @class IMTGatewayResponder
 * @extends IMTAction
 */
export class IMTGatewayResponder extends IMTAction {}
