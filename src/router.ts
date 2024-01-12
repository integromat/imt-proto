import { IMTBase, ModuleType } from './base';

/**
 * Base class for all Routers.
 */

export abstract class IMTRouter extends IMTBase {
  public readonly type = ModuleType.ROUTER;
}
