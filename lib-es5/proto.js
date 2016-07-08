'use strict'

/**
 * For API docummentation see ES6 version.
 */

if (global.IMT_PROTO_LOADED) return;
global.IMT_PROTO_LOADED = true;
if (!global.requireCommon) global.requireCommon = function() { return null; };

require('./extensions.js');
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
