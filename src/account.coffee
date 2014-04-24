###
Base class for all Accounts.

@property {Object} common Collection of common parameters. Read only.
@property {Object} data Collection of config parameters.
###
class global.IMTAccount
	common: null
	data: null
	
	###
	Initializes the account. Function that overrides should always call super.
	
	@callback done Callback to call when authorization request is ready.
		@param {Error} err Error on error, otherwise null.
	###

	initialize: (done) ->
		done?()

	###
	Finalizes the account. Function that overrides should always call super.
	
	@callback done Callback to call when module is finalized.
		@param {Error} err Error on error, otherwise null.
	###
	
	finalize: (done) ->
		done?()
		
	###
	Test account validity.
	
	@callback done Callback to call when authorization request is ready.
		@param {Error} err Error on error, otherwise null.
		@param {Boolean} valid True if account is valid.
	###
		
	test: (done) ->
		done?()

###
Base class for all OAuth Accounts.

@property {Object} TOKENS Collection of active request tokens (used by OAuth1).
###

class global.IMTOAuthAccount extends IMTAccount
	@TOKENS: {}
	
	###
	Sets account ID by received data.
	
	@param {stream.Readdable} req HTTP request stream.
	###
	
	accountFromCallbackRequest: (req) ->
		@id = null
	
	###
	Create authorization request and redirect user to OAuth provider.
	
	@callback done Callback to call when authorization request is ready.
		@param {Error} err Error on error, otherwise null.
		@param {String} url URL to redirect user to.
	###
	
	authorize: (done) ->
		done?()
	
	###
	Callback from OAuth provider.
	
	@param {stream.Readdable} req HTTP request stream.
	@callback done Callback to call when authorization request is ready.
		@param {Error} err Error on error, otherwise null.
	###
	
	callback: (req, done) ->
		done?()
	
	###
	Create scope extension request and redirect user to OAuth provider.
	
	@param scope {Array|String} Permission or array of permission to request.
	@callback done Callback to call when authorization request is ready.
		@param {Error} err Error on error, otherwise null.
		@param {String} url URL to redirect user to.
	###
	
	extendScope: (scope, done) ->
		done?()