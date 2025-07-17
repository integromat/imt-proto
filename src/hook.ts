/**
 * @module Hook
 *
 * Webhook processing functionality for handling incoming HTTP requests.
 * Hooks parse, filter, and process data from external webhook sources.
 */

import { EventEmitter } from 'events';
import type { NoParametersCallback } from './types';
import type { ApiData, EnvironmentData } from './base';

type Events = {
  response: [{ status: number; headers: Record<string, string>; body: unknown }];
  requestLogOverride: [Record<string, any>];
};

/**
 * Base class for all Hooks.
 *
 * Provides the foundation for webhook processing including initialization,
 * request parsing, item filtering, and form specification building.
 * All hook implementations should extend this class and override the
 * appropriate methods for their specific functionality.
 */
export class IMTHook<
  INPUT = unknown,
  ITEM extends Record<string, any> = Record<string, any>,
  DATA extends Record<string, any> = Record<string, any>,
> extends EventEmitter<Events> {
  data?: DATA;
  environment?: EnvironmentData | null = null;
  api?: ApiData;
  flags?: Record<string, any>;

  // Webhook-specific properties use by Gateway
  learning?: boolean;
  loadUDT?: (udtId: string, done: (error: Error | null, udt: Record<string, any>) => void) => void;
  generateUDT?: (
    type: 'json' | 'xml' | 'form' | 'query',
    data: unknown,
    done: (error: Error | null, spec: Record<string, any>) => void,
  ) => void;
  savePayloadStructure?: (spec: Record<string, any>, done: NoParametersCallback) => void;
  respond?: (status: number, headers: Record<string, string>, body: unknown) => void;

  /**
   * Initializes the hook. Function that overrides should always call super.
   *
   * @param done - Callback to call when hook is initialized
   */
  initialize(done: NoParametersCallback): void {
    if (typeof done === 'function') {
      done();
    }
  }

  /**
   * Finalizes the hook. Function that overrides should always call super.
   *
   * @param done - Callback to call when hook is finalized
   */
  finalize(done: NoParametersCallback): void {
    if (typeof done === 'function') {
      done();
    }
  }

  /**
   * Parse input and extract items.
   *
   * @param input - Input to parse
   * @param done - Callback to call when parsing is complete
   * @throws {Error} Always throws as this method must be overridden
   */
  parse(input: INPUT, done: (error?: Error | null, items?: ITEM[]) => void): void {
    void input;
    void done;
    throw new Error("Must override the superclass method 'parse'");
  }

  /**
   * Filter received items. Only effective in shared webhooks.
   *
   * @param item - Item to filter
   * @param data - Hook's data object
   * @param done - Callback to call when filter was resolved
   */
  filter(item: ITEM, data: DATA, done: (error?: Error | null, value?: boolean) => void): void {
    void item;
    void data;
    if (typeof done === 'function') {
      done(undefined, true);
    }
  }
}
