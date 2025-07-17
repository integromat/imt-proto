/**
 * @module Warning
 *
 * Provides warning functionality for non-fatal issues during scenario execution.
 * Warnings allow modules to report concerns without stopping scenario execution.
 */

/**
 * Warning class for reporting non-fatal issues during scenario execution.
 *
 * Warnings are used to notify administrators and users about potential
 * problems, misconfigurations, or unexpected conditions that don't prevent
 * the scenario from continuing but may require attention.
 *
 * @example
 * ```typescript
 * const warning = new Warning('API rate limit approaching threshold');
 * this.emit('warn', warning);
 * ```
 */
export class Warning {
  /**
   * The name identifier for this warning type.
   */
  name: string;

  /**
   * The warning message describing the issue.
   */
  message: string;

  /**
   * Optional call stack trace where the warning was created.
   */
  stack?: string;

  /**
   * Creates a new Warning instance.
   *
   * @param message - Descriptive message explaining the warning condition
   */
  constructor(message: string) {
    this.name = 'Warning';
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Warning toString.
 */

Object.defineProperty(Warning.prototype, 'toString', {
  configurable: true,
  writable: true,
  value(this: Warning) {
    return `${this.name}: ${this.message}`;
  },
});

/**
 * Warning inspect.
 */

Object.defineProperty(Warning.prototype, 'inspect', {
  configurable: true,
  writable: true,
  value(this: Warning) {
    return `[${this.name}: ${this.message}]`;
  },
});

/**
 * Warning JSON serialization.
 */

Object.defineProperty(Warning.prototype, 'toJSON', {
  configurable: true,
  writable: true,
  value(this: Warning) {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
    };
  },
});
