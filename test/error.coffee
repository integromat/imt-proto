assert = require 'assert'

describe 'Error', ->
	it 'UnknownError', (done) ->
		e = new UnknownError new Error "Error message."
		assert.equal e.message, "Error message."
		assert.equal typeof e.stack, 'string'
		
		done()