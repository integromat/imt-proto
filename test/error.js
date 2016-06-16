'use strict'

const assert = require('assert');

describe('Error', () => {
	it('UnknownError', done => {
		let e = new UnknownError(new Error("Error message."));
		
		assert.equal(e.message, "Error message.");
		assert.ok(/^UnknownError: Error message.\n/.test(e.stack));
		
		let err = JSON.parse(JSON.stringify(e));
		
		assert.equal(err.message, 'Error message.');
		
		// ---
		
		let te = new TypeError("Error message.");
		te.something = true;
		e = new UnknownError(te);
		
		assert.equal(e.message, "Error message.");
		assert.ok(/^UnknownError: Error message.\n/.test(e.stack));
		
		err = JSON.parse(JSON.stringify(e));
		
		assert.equal(err.message, 'Error message.');
		assert.equal(err.something, true);
		
		done();
	})
	
	it('DataError', done => {
		let e = new DataError('Some message.');
		
		assert.equal(e.name, "DataError");
		assert.equal(e.message, "Some message.");
		assert.ok(/^DataError: Some message.\n/.test(e.stack));

		done();
	})
	
	it('InvalidAccessTokenError', done => {
		let e = new InvalidAccessTokenError('Some message.');
		
		assert.equal(e.name, "InvalidAccessTokenError");
		assert.equal(e.message, "Some message.");
		assert.ok(/^InvalidAccessTokenError: Some message.\n/.test(e.stack));
		
		done();
	})
	
	it('JSON serialization', done => {
		let e = new DataError('Some message.');
		let ee = new TypeError('Type message.');
		
		e.hash = 'im-hash';
		e.external = true;
		e.something = 'donotserializeme';
		e.suberrors = [ee];

		assert.deepStrictEqual(e.toJSON(), {
			name: 'DataError',
			message: 'Some message.',
			stack: e.stack,
			hash: 'im-hash',
			external: true,
			suberrors: [{
				name: 'TypeError',
				message: 'Type message.',
				stack: ee.stack
			}]
		});

		done();
	})
});
