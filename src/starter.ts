import { IMTBase, ModuleType } from './base';
import { DoneWithResultCallback } from './types';

export class IMTStarter extends IMTBase {
  public readonly type = ModuleType.STARTER;

  start(done: DoneWithResultCallback): void {
    void done;
    throw new Error("Must override a superclass method 'start'.");
  }
}
