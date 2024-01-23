/**
 * Warning.
 *
 * @param {String} message Warning message.
 *
 * @property {String} stack Call stack.
 * @property {String} message Warning message.
 */

export class Warning {
  name: string;
  message: string;
  stack?: string;

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
