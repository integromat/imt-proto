'use strict'

const assert = require('assert');

class TestAction extends IMTAction {
	write(bundle, done) {
		if (bundle.number > 10)
			return done(new DataError('Number is greater than 10.'))
		
		done(null, {result: bundle.number * 2});
	}
}

describe('IMTAction', () => {
	it('should operate successfuly', (done) => {
		let input = {
			number: 1
		};
		
		let action = new TestAction();
		action.initialize((err) => {
			if (err) return done(err);
			
			action.write(input, (err, output) => {
				if (err) return done(err);
				
				assert.strictEqual(action.type, IMTBase.MODULETYPE_ACTION);
				assert.strictEqual(output.result, 2, 'Result should be equal to 2.');
				
				action.commit((err) => {
					if (err) return done(err);
				
					action.finalize(done);
				})
			})
		})
	})
	
	it('should fail with DataError', (done) => {
		let input = {
			number: 11
		};
		
		let action = new TestAction()
		action.initialize((err) => {
			if (err) return done(err);
			
			action.write(input, (err, output) => {
				assert.ok(err, 'Write should return error.')
				assert.ok(err instanceof DataError, 'Error should be instanceof DataError.')

				action.rollback((err) => {
					if (err) return done(err);
				
					action.finalize(done);
				})
			})
		})
	})
});

