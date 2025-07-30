/**
 * Common test helper functions for wrapping callback-based APIs with async/await.
 *
 * These helpers provide a consistent way to work with promise-based testing
 * while maintaining compatibility with the existing callback-based module APIs.
 */

import type { Bundle } from '../src/types';
import type { IMTAction } from '../src/action';
import type { IMTTrigger } from '../src/trigger';
import type { IMTBase } from '../src/base';

/**
 * Async wrapper for the initialize method of IMT modules.
 */
export function initializeAsync(instance: IMTBase): Promise<void> {
  return new Promise((resolve, reject) => {
    instance.initialize((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Async wrapper for the write method of IMT Action modules.
 */
export function writeAsync(instance: IMTAction, bundle: Bundle): Promise<any> {
  return new Promise((resolve, reject) => {
    instance.write(bundle, (error, output) => {
      if (error) {
        reject(error);
      } else {
        resolve(output);
      }
    });
  });
}

/**
 * Async wrapper for the read method of IMT Trigger modules.
 */
export function readAsync(instance: IMTTrigger): Promise<any> {
  return new Promise((resolve, reject) => {
    instance.read((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * Async wrapper for the commit method of IMT modules.
 */
export function commitAsync(instance: IMTBase): Promise<void> {
  return new Promise((resolve, reject) => {
    instance.commit((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Async wrapper for the rollback method of IMT modules.
 */
export function rollbackAsync(instance: IMTBase): Promise<void> {
  return new Promise((resolve, reject) => {
    instance.rollback((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Async wrapper for the finalize method of IMT modules.
 */
export function finalizeAsync(instance: IMTBase): Promise<void> {
  return new Promise((resolve, reject) => {
    instance.finalize((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
