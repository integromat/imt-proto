'use strict'

/**
 * Base class for all Convergers.
 */

global.IMTConverger = class IMTConverger extends IMTBase {
	constructor() {
		super();
		
		this.type = IMTBase.MODULETYPE_CONVERGER;
	}
};
