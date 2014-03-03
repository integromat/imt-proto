assert = require 'assert'

describe 'Warning', ->
	it 'general', (done) ->
		w = new Warning "Warning message."
		assert.equal w.message, "Warning message."
		assert.equal typeof w.stack, 'string'
		
		done()