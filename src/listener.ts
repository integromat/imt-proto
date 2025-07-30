/**
 * @module Listener
 *
 * Listener functionality for monitoring and receiving data from various sources.
 * Listeners provide the foundation for real-time data ingestion and monitoring.
 */

'use strict';

import type { NoParametersCallback } from './types';
import { IMTBase, ModuleType } from './base';

/**
 * Base class for all Listeners
 *
 * Listeners are responsible for monitoring and receiving data from various sources.
 * This abstract class provides the common interface that all listener implementations
 * must follow.
 *
 * @example
 * ```typescript
 * class FileListener extends IMTListener {
 *   start(callback: DoneCallback): void {
 *     // Implementation for starting file monitoring
 *     callback(undefined);
 *   }
 *
 *   stop(callback: DoneCallback): void {
 *     // Implementation for stopping file monitoring
 *     callback(undefined);
 *   }
 * }
 * ```
 *
 * @fires IMTListener#data - Emitted when new data is received
 */
export class IMTListener extends IMTBase {
  public readonly type = ModuleType.LISTENER;

  /**
   * Starts the listener to begin monitoring for new data.
   *
   * This method must be implemented by subclasses to define how the specific
   * listener type begins its monitoring process. The callback should be invoked
   * once the listener is ready and actively listening for data.
   *
   * @param callback - Function to call when the listener has started successfully
   *                   or when an error occurs during startup
   * @throws {Error} Always throws since this is an abstract method that must be overridden
   *
   * @example
   * ```typescript
   * listener.start((error) => {
   *   if (error) {
   *     console.error('Failed to start listener:', error);
   *   } else {
   *     console.log('Listener started successfully');
   *   }
   * });
   * ```
   */
  start(callback: NoParametersCallback): void {
    void callback;
    throw new Error('IMTListener.start() must be implemented by subclass. This is an abstract method.');
  }

  /**
   * Stops the listener from monitoring for new data.
   *
   * This method must be implemented by subclasses to define how the specific
   * listener type ceases its monitoring process. The callback should be invoked
   * once the listener has completely stopped and cleaned up any resources.
   *
   * @param callback - Function to call when the listener has stopped successfully
   *                   or when an error occurs during shutdown
   * @throws {Error} Always throws since this is an abstract method that must be overridden
   *
   * @example
   * ```typescript
   * listener.stop((error) => {
   *   if (error) {
   *     console.error('Failed to stop listener:', error);
   *   } else {
   *     console.log('Listener stopped successfully');
   *   }
   * });
   * ```
   */
  stop(callback: NoParametersCallback): void {
    void callback;
    throw new Error('IMTListener.stop() must be implemented by subclass. This is an abstract method.');
  }
}

/**
 * Data event fired when the listener receives new data.
 *
 * @event IMTListener#data
 * @type {object}
 * @property {any} data - The received data payload
 * @property {Date} timestamp - When the data was received
 */
