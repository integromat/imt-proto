import type { EventEmitter } from 'events';

/** Runs a Node-style callback method and resolves with its result. */
export function run<T = void>(fn: (done: (err?: Error | null, result?: T) => void) => void): Promise<T> {
  return new Promise((resolve, reject) => fn((err, result) => (err ? reject(err) : resolve(result as T))));
}

/** Waits for a single named event and resolves with its payload. */
export function onceEvent<T = unknown>(emitter: EventEmitter, event: string): Promise<T> {
  return new Promise((resolve) => emitter.once(event, (payload: T) => resolve(payload)));
}
