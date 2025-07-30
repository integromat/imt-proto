/**
 * @module Trigger
 *
 * Trigger functionality for initiating scenarios by fetching data from external sources.
 * Triggers serve as the entry points for data processing pipelines.
 */

import { IMTBase, ModuleType } from './base';
import type { DoneCallback, DoneWithResultCallback } from './types';

/**
 * Base class for all trigger modules in the Make Native Apps.
 *
 * Triggers are responsible for initiating scenarios by fetching or reading data
 * from external sources. This abstract base class defines the common interface
 * that all trigger implementations must follow.
 */
export class IMTTrigger extends IMTBase {
  public readonly type = ModuleType.TRIGGER;

  /**
   * Fetches data for a specific document by its identifier.
   *
   * This method is primarily used by webhook triggers to retrieve
   * specific documents when notified of changes.
   *
   * @param documentId - The unique identifier of the document to fetch
   * @param doneCallback - Callback function to invoke when the fetch operation completes
   * @throws {Error} Always throws since this method must be overridden by subclasses
   */
  fetch(documentId: number, doneCallback: DoneCallback): void {
    void documentId;
    void doneCallback;
    throw new Error('The fetch method must be implemented by trigger subclasses.');
  }

  /**
   * Reads data from the trigger's data source.
   *
   * This method performs the primary data retrieval operation for the trigger,
   * returning either a single collection of data or multiple collections in a batch.
   *
   * @param doneCallback - Callback function to invoke when the read operation completes
   * @throws {Error} Always throws since this method must be overridden by subclasses
   */
  read(doneCallback: DoneWithResultCallback): void {
    void doneCallback;
    throw new Error('The read method must be implemented by trigger subclasses.');
  }
}

/**
 * Base class for gateway trigger modules.
 *
 * Gateway triggers are specialized triggers that handle communication
 * through gateway services, providing additional abstraction and routing
 * capabilities for external data sources.
 */
export class IMTGatewayTrigger extends IMTTrigger {}
