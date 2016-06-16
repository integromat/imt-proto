const assert = require('assert');

class TestTrigger extends IMTTrigger {
	read(done) {
		if (this.parameters.host === '127.0.0.1')
			return done(new ConnectionError('Access denied to localhost.'))
		
		done(null, [
			{id: 1, name: 'Peter'},
			{id: 2, name: 'Patrick'}
		]);
	}
}

describe('IMTAction', () => {
	it('should operate successfuly', (done) => {
		let trigger = new TestTrigger();
		trigger.parameters = {host: 'www.integromat.com'};
		trigger.initialize((err) => {
			if (err) return done(err);
			
			trigger.read((err, output) => {
				if (err) return done(err);
				
				assert.strictEqual(trigger.type, IMTBase.MODULETYPE_TRIGGER);
				assert.deepStrictEqual(output, [
					{id: 1, name: 'Peter'},
					{id: 2, name: 'Patrick'}
				], 'Output not as expected.');
				
				trigger.commit((err) => {
					if (err) return done(err);
				
					trigger.finalize(done);
				})
			})
		})
	})
	
	it('should fail with ConnectionError', (done) => {
		let trigger = new TestTrigger()
		trigger.parameters = {host: '127.0.0.1'};
		trigger.initialize((err) => {
			if (err) return done(err);
			
			trigger.read((err, output) => {
				assert.ok(err, 'Write should return error.')
				assert.ok(err instanceof ConnectionError, 'Error should be instanceof DataError.')

				trigger.rollback((err) => {
					if (err) return done(err);
				
					trigger.finalize(done);
				})
			})
		})
	})
});

