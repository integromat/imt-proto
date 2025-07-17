/**
 * @module Error
 *
 * Comprehensive error handling system for Make scenario executions.
 * Provides specialized error classes for different failure scenarios and system behaviors.
 */

import type { Bundle } from './types';

declare global {
  /**
   * Extended Error interface with additional properties for the application's error handling system.
   */
  interface Error {
    /**
     * The name of the error.
     */
    name: string;
    /**
     * The error message.
     */
    message: string;
    /**
     * Optional stack trace of the error.
     */
    stack?: string;
    /**
     * Unique hash identifier for the error instance.
     */
    hash?: string;
    /**
     * Optional bundle associated with the error.
     */
    bundle?: Bundle;
    /**
     * Collection of nested errors that contributed to this error.
     */
    suberrors?: Error[];
    /**
     * External data related to the error from third-party systems.
     */
    external?: unknown;
    /**
     * @deprecated Use hash instead. Kept for backward compatibility.
     */
    imtExceptionHash?: string; // moved from imt-blueprint - it is the same thing as hash, it is just a historical inconsistency
    /**
     * @deprecated Use standard Error.cause property instead. Kept for backward compatibility.
     */
    imtInternalError?: Error; // moved from imt-blueprint

    /**
     * Serializes the error object to JSON format.
     * @returns Serialized error object.
     */
    toJSON(): ErrorJSON;
  }
}

/**
 * JSON representation of an Error object for serialization purposes.
 */
export type ErrorJSON = {
  /**
   * The name of the error.
   */
  name: string;
  /**
   * The error message.
   */
  message: string;
  /**
   * Optional stack trace of the error.
   */
  stack?: string;
  /**
   * Unique hash identifier for the error instance.
   */
  hash?: string;
  /**
   * @deprecated Use hash instead. Kept for backward compatibility.
   */
  imtExceptionHash?: string;
  /**
   * @deprecated Do not use. Use standard Error.cause property instead.
   */
  imtInternalError?: ErrorJSON;
  /**
   * Optional bundle associated with the error.
   */
  bundle?: Bundle;
  /**
   * Collection of nested errors that contributed to this error.
   */
  suberrors?: ErrorJSON[];
  /**
   * External data related to the error from third-party systems.
   */
  external?: unknown;
};

/**
 * Error class used when a non-Error object is thrown or encountered in program logic.
 * Converts any error-like object or string into a proper Error instance.
 *
 * @param err - The original error object or error message string.
 */
export class UnknownError extends Error {
  constructor(error: Error | string) {
    super();

    if ('object' === typeof error) {
      Object.assign(this, error);
      this.message = error.message || '<no message>';
    } else if ('string' === typeof error) {
      this.message = error;
    }

    this.name = 'UnknownError';
    Object.setPrototypeOf(this, UnknownError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(): ErrorJSON {
    return { ...this, ...super.toJSON() };
  }
}

/**
 * Error class for runtime execution failures in program logic.
 * Used when an error is not related to invalid data but to a logical issue in execution.
 * When thrown, the process flow will be rolled back.
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
 * Error class for invalid data scenarios.
 * When thrown, the bundle will be moved to Dead Letter Queue (DLQ)
 * while the process flow commits normally.
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
 * Error class for system consistency violations.
 * Used when a commit or rollback operation fails, indicating a potential data integrity issue.
 * When thrown, the process flow stops immediately while any already committed data remains committed.
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
 * Error class for API rate limit violations.
 * Used when an external API rate limit is exceeded and operations need to be delayed.
 *
 * **IMPORTANT**: Throwing this error freezes the scenario execution for the specified delay time.
 *
 * @param message - The error message explaining the rate limit violation.
 * @param delay - Delay in milliseconds before retrying the operation.
 */
export class RateLimitError extends Error {
  /**
   * The time in milliseconds to wait before retrying the operation.
   */
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
 * Error class for storage capacity limitations.
 * Used when a service reports that it has not enough storage space to complete the requested operation.
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
 * Error class for service connectivity issues.
 * Used when a connection to an external service cannot be established
 * or is interrupted during operation.
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
 * Error class for configuration-related issues.
 * Used when the system configuration is broken or invalid in a way that requires
 * user intervention to resolve.
 *
 * **IMPORTANT**: Throwing this error automatically disables the scenario until resolved.
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
 * Error class for authentication token issues.
 * Used when a service access token has expired or is otherwise invalid.
 * Extends InvalidConfigurationError as it's a specific configuration problem.
 *
 * **IMPORTANT**: Throwing this error automatically disables the scenario until the token is renewed.
 */
export class InvalidAccessTokenError extends InvalidConfigurationError {
  constructor(message: string) {
    super(message);

    this.name = 'InvalidAccessTokenError';
    Object.setPrototypeOf(this, InvalidAccessTokenError.prototype);
  }
}

/**
 * Error class for unexpected and critical system failures.
 * Used when unpredicted conditions occur that cannot be handled by the system.
 *
 * **IMPORTANT**: Throwing this error disables and locks the scenario.
 * Administrative staff intervention is required to unlock the scenario.
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
 * Error class for result size limit violations.
 * Used when the number of results returned by an operation exceeds
 * the maximum allowable limit.
 *
 * **IMPORTANT**: Throwing this error automatically disables the scenario.
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
 * Error class for file size limit violations.
 * Used when a file's size exceeds the maximum allowable limit for processing.
 *
 * **IMPORTANT**: Throwing this error automatically disables the scenario.
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
 * Error class for incomplete data scenarios.
 * Used when received data is missing required fields or components.
 * Can specify a delay before retrying the operation.
 *
 * @param message - The error message explaining what data is incomplete.
 * @param delay - Delay in milliseconds before retrying the operation.
 */
export class IncompleteDataError extends Error {
  /**
   * The time in milliseconds to wait before retrying the operation.
   */
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
 * Error class for duplicate data scenarios.
 * Used when a service receives data that it has already processed or stored,
 * violating uniqueness constraints.
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
 * Error class for module execution timeout.
 * Used when a service module operation takes longer than its allotted time limit,
 * indicating a potential performance issue or infinite loop.
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
 * Error class for scenario execution timeout.
 * Used when the entire scenario execution exceeds its allocated time limit,
 * often indicating complex processing or performance bottlenecks.
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
 * Error class for operation quota violations.
 * Used when the processing of a scenario exceeds the maximum number of
 * allowed operations, preventing resource exhaustion.
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
 * Error class for data size limit violations.
 * Used when the processing of a scenario involves data that exceeds
 * the maximum allowable size limit, preventing memory issues.
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
 * Error class for execution interruption scenarios.
 * Used when the normal execution flow is forcibly interrupted by an external
 * event or user action rather than completing naturally.
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
 * Adds JSON serialization capability to all Error objects.
 * Allows errors to be properly serialized when using JSON.stringify.
 */
Object.defineProperty(Error.prototype, 'toJSON', {
  enumerable: false,
  writable: true,
  value(this: Error): ErrorJSON {
    const json: ErrorJSON = {
      name: this.name,
      message: this.message,
      stack: this.stack,
    };

    if (this.hash != undefined) {
      json.hash = this.hash;
    }

    if (this.bundle != undefined) {
      json.bundle = this.bundle;
    }

    if (Array.isArray(this.suberrors)) {
      json.suberrors = this.suberrors;
    }

    if (this.external != undefined) {
      json.external = this.external;
    }

    if (this.imtInternalError) {
      json.imtInternalError = this.imtInternalError;
    }

    if (this.imtExceptionHash) {
      json.imtExceptionHash = this.imtExceptionHash;
    }

    return json;
  },
});

/**
 * Property definition that synchronizes hash and imtExceptionHash.
 * Both properties reference the same value but with different names for historical compatibility.
 * This getter/setter ensures they remain synchronized to a single value.
 */
Object.defineProperty(Error.prototype, 'imtExceptionHash', {
  enumerable: true,
  /**
   * Making the property configurable allows it to be redefined when the prototype is loaded multiple times.
   * This is necessary because imt-blueprint loads the prototype in unexpected ways,
   * which would otherwise cause property redefinition errors.
   */
  configurable: true,
  set(this: Error, newValue: string) {
    this.hash = newValue;
  },
  get(this: Error): string | undefined {
    return this.hash;
  },
});
