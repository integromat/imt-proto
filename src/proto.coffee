if global.IMT_PROTO_LOADED then return
global.IMT_PROTO_LOADED = true

###
Requrie module from common collection of pre-loaded modules.

@param {String} name Module nane.
@returns {*}
###

global.requireCommon ?= -> null

require './extensions.js'
require './error.js'
require './warning.js'
require './base.js'
require './account.js'
require './trigger.js'
require './action.js'
require './transformer.js'
require './aggregator.js'
require './feeder.js'
require './hook.js'
require './rpc.js'
