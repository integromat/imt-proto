import { Readable } from 'stream';
import { CommonData, ModuleData } from './base';
import { DoneCallback } from './types';

export type Scope = string[];

export type DoneWithUrlCallback = (err?: Error | null, url?: string) => void;

/**
 * Base class for all Accounts.
 *
 * @property common - Collection of common parameters. Read only.
 * @property data - Collection of config parameters.
 */
export class IMTAccount {
  public common: CommonData | null;
  public data: ModuleData | null;

  constructor() {
    this.common = null;
    this.data = null;
  }

  /**
   * Initializes the account. Function that overrides should always call super.
   *
   * @callback done Callback to call when account is initialized.
   * 	@param {Error} err - Error on error, otherwise null.
   */
  initialize(done: DoneCallback) {
    if ('function' === typeof done) done();
  }

  /**
   * Finalizes the account. Function that overrides should always call super.
   *
   * @callback done Callback to call when account is finalized.
   *     @param {Error} err Error on error, otherwise null.
   */
  finalize(done: DoneCallback) {
    if ('function' === typeof done) done();
  }

  /**
   * Test account connection.
   *
   * @callback done Callback to call when test is complete.
   *     @param {Error} err Error on error, otherwise null.
   *     @param {Boolean} valid True if account is valid.
   */
  test(done: DoneCallback) {
    if ('function' === typeof done) done();
  }

  /**
   * Test account validity.
   *
   * @callback done Callback to call when validation is complete.
   *     @param {Error} err Error on error, otherwise null.
   *     @param {Boolean} changed True if validation made changes in account's data.
   */
  validate(done: DoneCallback) {
    if ('function' === typeof done) done();
  }
}

/*
Base class for all OAuth Accounts.
*/

export class IMTOAuthAccount extends IMTAccount {
  private id?: string | null;

  /**
   * Sets account ID by received data.
   *
   * @param {stream.Readdable} req HTTP request stream.
   * @callback done Callback to call when account was resolved from request.
   *     @param {Error} err Error on error, otherwise null.
   */
  accountFromCallbackRequest(req: Readable, done: DoneCallback) {
    this.id = null;

    if ('function' === typeof done) done();
  }

  /**
   * Create authorization request and redirect user to OAuth provider.
   *
   * @param {Array} scope Array of permission to request.
   * @callback done Callback to call when authorization request is complete.
   *     @param {Error} err Error on error, otherwise null.
   *     @param {String} url URL to redirect user to.
   */
  authorize(scope: Scope, done: DoneWithUrlCallback) {
    if ('function' === typeof done) done();
  }

  /**
   * Callback from OAuth provider.
   *
   * @param {stream.Readdable} req HTTP request stream.
   * @callback done Callback to call when authorization request is complete.
   *     @param {Error} err Error on error, otherwise null.
   */
  callback(req: Readable, done: DoneCallback) {
    if ('function' === typeof done) done();
  }

  /**
   * Create scope extension request and redirect user to OAuth provider.
   *
   * @param {Array} scope Array of permission to request.
   * @callback done Callback to call when authorization request is complete.
   *     @param {Error} err Error on error, otherwise null.
   *     @param {String} url URL to redirect user to.
   */
  extendScope(scope: Scope, done: DoneWithUrlCallback) {
    if ('function' === typeof done) done();
  }

  /**
   * Create reauthorization request and redirect user to OAuth provider.
   *
   * @callback done Callback to call when authorization request is complete.
   *     @param {Error} err Error on error, otherwise null.
   *     @param {String} url URL to redirect user to.
   */
  reauthorize(done: DoneWithUrlCallback) {
    if ('function' === typeof done) done();
  }

  /**
   * Invalidate current access token.
   *
   * @callback done Callback to call when invalidation request is complete.
   *     @param {Error} err Error on error, otherwise null.
   */
  invalidate(done: DoneCallback) {
    if ('function' === typeof done) done();
  }
}
