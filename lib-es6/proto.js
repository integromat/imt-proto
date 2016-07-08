'use strict'

if (global.IMT_PROTO_LOADED) return;
global.IMT_PROTO_LOADED = true;

/**
 * Requrie module from common collection of pre-loaded modules. This method is set later by Integromat's core.
 * 
 * @param {String} name Module nane.
 * @returns {*}
 */

if (!global.requireCommon) global.requireCommon = () => null;

require('./error.js');
require('./warning.js');
require('./base.js');
require('./account.js');
require('./trigger.js');
require('./action.js');
require('./transformer.js');
require('./aggregator.js');
require('./feeder.js');
require('./listener.js');
require('./hook.js');
require('./rpc.js');
