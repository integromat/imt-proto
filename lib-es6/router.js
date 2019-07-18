'use strict'

/**
 * Base class for all Routers.
 */

global.IMTRouter = class IMTRouter extends IMTBase {
	constructor() {
		super();
		
		this.type = IMTBase.MODULETYPE_ROUTER;
	}
};
