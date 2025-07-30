/**
 * @module Account
 *
 * Account management and authentication for external service integrations.
 * Provides base classes for handling credentials, OAuth flows, and service connections.
 */

import type { Readable } from 'stream';
import type { ApiData, CommonData, EnvironmentData, ModuleData, ScenarioData } from './base';
import type { DoneCallback } from './types';

export type Scope = string[];

export type DoneWithUrlCallback = (err?: Error | null, url?: string) => void;

/**
 * Base class for all Accounts.
 *
 * @class IMTAccount
 * @property {string | number | null} id - The unique identifier for the account
 * @property {string | null} name - The display name of the account
 * @property {CommonData | null} common - Collection of common parameters (read-only)
 * @property {ModuleData | null} data - Collection of config parameters
 * @property {EnvironmentData | null} environment - Environment configuration data
 * @property {ScenarioData | null} scenario - Scenario configuration data
 * @property {ApiData} [api] - Optional API configuration for custom apps accounts
 * @property {Function} [log] - Function for logging messages
 * @property {Function} [debug] - Function for debug logging
 */
export class IMTAccount {
  id: string | number | null = null;
  name: string | null = null;
  common: CommonData | null = null;
  data: ModuleData | null = null;
  environment: EnvironmentData | null = null;
  scenario: ScenarioData | null = null;
  api?: ApiData;

  log?: (...args: any[]) => void;
  debug?: (...args: any[]) => void;

  /**
   * Initializes the account. Function that overrides should always call the parent method using super.
   *
   * @param {DoneCallback} done - Callback function executed when initialization completes
   * @returns {void}
   */
  initialize(done: DoneCallback): void {
    if ('function' === typeof done) done();
  }

  /**
   * Finalizes the account. Function that overrides should always call the parent method using super.
   *
   * @param {DoneCallback} done - Callback function executed when finalization completes
   * @returns {void}
   */
  finalize(done: DoneCallback): void {
    if ('function' === typeof done) done();
  }

  /**
   * Tests account connection.
   *
   * @param {(error?: Error | null, valid?: boolean) => void} done - Callback executed when test completes
   * @returns {void}
   */
  test(done: (error?: Error | null, valid?: boolean) => void): void {
    if ('function' === typeof done) done();
  }

  /**
   * Validates account configuration.
   *
   * @param {(error?: Error | null, changed?: boolean) => void} done - Callback executed when validation completes
   * @returns {void}
   */
  validate(done: (error?: Error | null, changed?: boolean) => void): void {
    if ('function' === typeof done) done();
  }
}

/**
 * Base class for all OAuth Accounts.
 *
 * @class IMTOAuthAccount
 * @extends IMTAccount
 */
export class IMTOAuthAccount extends IMTAccount {
  /**
   * Sets account ID by received data.
   * @param req - HTTP request stream
   * @param done - Callback called when the account was resolved from request
   */
  accountFromCallbackRequest(req: Readable, done: DoneCallback): void {
    void req;
    this.id = null;

    if ('function' === typeof done) done();
  }

  /**
   * Create authorization request and redirect user to OAuth provider.
   * @param scope - Array of permissions to request
   * @param done - Callback called when authorization request is complete
   */
  authorize(scope: Scope, done: DoneWithUrlCallback): void {
    void scope;
    if ('function' === typeof done) done();
  }

  /**
   * Callback from OAuth provider.
   * @param req - HTTP request stream
   * @param done - Callback called when authorization request is complete
   */
  callback(req: Readable, done: DoneCallback): void {
    void req;
    if ('function' === typeof done) done();
  }

  /**
   * Create scope extension request and redirect user to OAuth provider.
   * @param scope - Array of permissions to request
   * @param done - Callback called when extension request is complete
   */
  extendScope(scope: Scope, done: DoneWithUrlCallback): void {
    void scope;
    if ('function' === typeof done) done();
  }

  /**
   * Create reauthorization request and redirect user to OAuth provider.
   * @param {DoneWithUrlCallback} done Callback called when reauthorization request is complete
   * @param {Error | null} done.error Error object if reauthorization failed, null otherwise
   * @param {string} [done.url] URL to redirect user to
   */
  reauthorize(done: DoneWithUrlCallback) {
    if ('function' === typeof done) done();
  }

  /**
   * Invalidate the current access token.
   * @param {DoneCallback} done Callback called when invalidation request is complete
   * @param {Error | null} done.error Error object if invalidation failed, null otherwise
   */
  invalidate(done: DoneCallback) {
    if ('function' === typeof done) done();
  }
}
