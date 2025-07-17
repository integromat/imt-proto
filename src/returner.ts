/**
 * @module Returner
 *
 * Provides return functionality for sending data back to the scenario or external systems.
 * Returners handle the final output stage of scenario processing.
 */

import { IMTBase, ModuleType } from './base';
import type { Bundle, DoneWithResultCallback } from './types';

/**
 * Base class for all Returner modules.
 *
 * Returners are responsible for handling the final output of processed data,
 * whether returning it to the originating system, sending it to external
 * endpoints, or formatting it for specific consumption patterns.
 */
export class IMTReturner extends IMTBase {
  public readonly type = ModuleType.RETURNER;

  /**
   * Returns processed data to the appropriate destination.
   *
   * This method must be overridden by subclasses to implement specific
   * return logic, such as formatting output, sending to external systems,
   * or preparing data for further processing.
   *
   * @param bundle - Collection of data to return
   * @param done - Callback to invoke when return operation is complete
   * @throws {Error} Always throws since this method must be overridden
   */
  returnData(bundle: Bundle, done: DoneWithResultCallback): void {
    void bundle;
    void done;
    throw new Error("Must override superclass method 'returnData'");
  }
}
