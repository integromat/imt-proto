import { Bundle } from './types';

declare global {
  interface Error {
    name: string;
    message: string;
    stack?: string;
    hash?: string;
    bundle?: Bundle;
    suberrors?: Error[];
    external?: any;

    toJSON(): ErrorJSON;
  }
}

export interface ErrorJSON {
  name: string;
  message: string;
  stack?: string;
  hash?: string;
  bundle?: Bundle;
  suberrors?: ErrorJSON[];
  external?: any;
}

/**
 * Unknown Error. Used when non-instanceof-error error happens in program logic.
 *
 * @param {*} err Original error.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class UnknownError extends Error {
  constructor(err: Error | string) {
    super();

    if ('object' === typeof err) {
      Object.assign(this, err);
      this.message = err.message || '<no message>';
    } else if ('string' === typeof err) {
      this.message = err;
    }

    this.name = 'UnknownError';
    Object.setPrototypeOf(this, UnknownError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return Object.assign(super.toJSON(), this);
  }
}

/**
 * Runtime Error. Used when error happens in program logic, not in invalid data. Flow will be rolled back.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class RuntimeError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'RuntimeError';
    Object.setPrototypeOf(this, RuntimeError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Data Error. Used on invalid data. Bundle will be moved to DLQ. Process flow will be commited normally.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class DataError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'DataError';
    Object.setPrototypeOf(this, DataError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Inconsistency Error. Used when commit/rollback fails. Process flow stops immediately. Commited data remain commited.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class InconsistencyError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'InconsistencyError';
    Object.setPrototypeOf(this, InconsistencyError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Rate Limit Error. Used when API rate limit is exceeded.
 *
 * **IMPORTANT**: Also freezes the scenario for some time.
 *
 * @param {String} message Error message.
 * @param {Number} [delay] Delay in milliseconds. Optional, default is 20 minutes.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 * @property {Number} delay Delay in milliseconds.
 */

export class RateLimitError extends Error {
  public delay: number;

  constructor(message: string, delay: number) {
    super(message);

    this.name = 'RateLimitError';
    Object.setPrototypeOf(this, RateLimitError.prototype);
    this.delay = delay;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Out Of Space Error. Used when service reports out of space.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class OutOfSpaceError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'OutOfSpaceError';
    Object.setPrototypeOf(this, OutOfSpaceError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Connection Error. Used when there is a problem with connection to the service.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class ConnectionError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'ConnectionError';
    Object.setPrototypeOf(this, ConnectionError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Invalid Configuration Error. Used when configuration is broken and user interaction is required.
 *
 * **IMPORTANT**: Also disables the scenario.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class InvalidConfigurationError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'InvalidConfigurationError';
    Object.setPrototypeOf(this, InvalidConfigurationError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Invalid Access Token Error. Used when service access token is expired or invalid.
 *
 * **IMPORTANT**: Also disables the scenario.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class InvalidAccessTokenError extends InvalidConfigurationError {
  constructor(message: string) {
    super(message);

    this.name = 'InvalidAccessTokenError';
    Object.setPrototypeOf(this, InvalidAccessTokenError.prototype);
  }
}

/**
 * Invalid Access Token Error. Used when unexpected things occurs.
 *
 * **IMPORTANT**: Also disables and lock the scenario. Staff revision is required in order to unlock the scenario.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class UnexpectedError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'UnexpectedError';
    Object.setPrototypeOf(this, UnexpectedError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Max Results Exceeded Error. Used when limit of results was exceeded.
 *
 * **IMPORTANT**: Also disables the scenario.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class MaxResultsExceededError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'MaxResultsExceededError';
    Object.setPrototypeOf(this, MaxResultsExceededError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Max File Size Exceeded Error. Used when limit of file size was exceeded.
 *
 * **IMPORTANT**: Also disables the scenario.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class MaxFileSizeExceededError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'MaxFileSizeExceededError';
    Object.setPrototypeOf(this, MaxFileSizeExceededError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Incomplete Data Error. Used when received data are incomplete.
 *
 * @param {String} message Error message.
 * @param {Number} [delay] Delay in milliseconds. Optional.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 * @property {Number} delay Delay in milliseconds.
 */

export class IncompleteDataError extends Error {
  public delay: number;

  constructor(message: string, delay: number) {
    super(message);

    this.name = 'IncompleteDataError';
    Object.setPrototypeOf(this, IncompleteDataError.prototype);
    this.delay = delay;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Duplicate Data Error. Used when service receives duplicate data.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class DuplicateDataError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'DuplicateDataError';
    Object.setPrototypeOf(this, DuplicateDataError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Module Timeout Error. Used when service module operation exceeds time limit.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class ModuleTimeoutError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'ModuleTimeoutError';
    Object.setPrototypeOf(this, ModuleTimeoutError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Scenario Timeout Error. Used when service scenario execution exceeds time limit.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class ScenarioTimeoutError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'ScenarioTimeoutError';
    Object.setPrototypeOf(this, ScenarioTimeoutError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Used when processing of a scenario exceeds operations limit.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class OperationsLimitExceededError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'OperationsLimitExceededError';
    Object.setPrototypeOf(this, OperationsLimitExceededError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Used when processing of a scenario exceeds data size limit.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class DataSizeLimitExceededError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'DataSizeLimitExceededError';
    Object.setPrototypeOf(this, DataSizeLimitExceededError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Used when execution is interrupted.
 *
 * @param {String} message Error message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Error message.
 */

export class ExecutionInterruptedError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'ExecutionInterruptedError';
    Object.setPrototypeOf(this, ExecutionInterruptedError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error JSON serialization.
 */

Object.defineProperty(Error.prototype, 'toJSON', {
  enumerable: false,
  writable: true,
  value(this: Error): ErrorJSON {
    const json: { name: string; message: string } & Record<string, unknown> = {
      name: this.name,
      message: this.message,
      stack: this.stack,
    };

    if (this.hash != null) json.hash = this.hash;
    if (this.bundle != null) json.bundle = this.bundle;
    if (Array.isArray(this.suberrors)) json.suberrors = this.suberrors.map((item: Error) => item.toJSON());
    if (this.external != null) json.external = this.external;

    return json;
  },
});
