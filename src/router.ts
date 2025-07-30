/**
 * @module Router
 *
 * Provides routing functionality for directing data flow through different execution paths.
 * Routers enable multiple flows in scenarios.
 */

import { IMTBase, ModuleType } from './base';

/**
 * Base class for all Routers.
 */
export class IMTRouter extends IMTBase {
  public readonly type = ModuleType.ROUTER;
}
