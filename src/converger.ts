/**
 * @module Converger
 *
 * Provides converger functionality for merging multiple execution routes into a single path.
 * Convergers are essential for synchronizing parallel flows in complex scenarios.
 */

import { IMTBase, ModuleType } from './base';

/**
 * Base class for all Converger modules.
 * Convergers are responsible for merging multiple routes into one.
 *
 * @class IMTConverger
 * @extends IMTBase
 */
export class IMTConverger extends IMTBase {
  public readonly type = ModuleType.CONVERGER;
}
