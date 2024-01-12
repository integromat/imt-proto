import { IMTBase, ModuleType } from './base';

/**
 * Base class for all Convergers.
 */

export abstract class IMTConverger extends IMTBase {
  public readonly type = ModuleType.CONVERGER;
}
