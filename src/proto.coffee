if global.IMT_PROTO_LOADED then return
global.IMT_PROTO_LOADED = true
global.requireCommon ?= -> null

require './extensions.js'
require './error.js'
require './warning.js'
require './base.js'
require './account.js'
require './trigger.js'
require './action.js'
require './listener.js'
require './transformer.js'
require './hook.js'