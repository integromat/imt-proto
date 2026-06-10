import * as assert from 'assert';
import { IMTBase, ProgressContent } from '../src/base';

class TestModule extends IMTBase {}

describe('IMTBase', () => {
  describe('progress', () => {
    it('should emit progress event with sessionStarted content', (done) => {
      const module = new TestModule();
      const content: ProgressContent = {
        type: 'aiBrowserProgress',
        event: 'sessionStarted',
        liveViewUrl: 'https://example.com/live',
      };

      module.on('progress', (received) => {
        assert.deepStrictEqual(received, content);
        module.finalize(done);
      });

      module.progress(content);
    });

    it('should emit progress event with step content', (done) => {
      const module = new TestModule();
      const content: ProgressContent = {
        type: 'aiBrowserProgress',
        event: 'step',
        stepIndex: 1,
        summary: 'Navigated to example.com',
        stepType: 'tool-call',
      };

      module.on('progress', (received) => {
        assert.deepStrictEqual(received, content);
        module.finalize(done);
      });

      module.progress(content);
    });
  });
});
