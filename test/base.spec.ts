import * as assert from 'assert';
import { IMTBase, ProgressContent } from '../src/base';
import { onceEvent, run } from './helpers';

class TestModule extends IMTBase {}

describe('IMTBase', () => {
  describe('progress', () => {
    it('should emit progress event with sessionStarted content', async () => {
      const module = new TestModule();
      const content: ProgressContent = {
        type: 'aiBrowserProgress',
        event: 'sessionStarted',
        liveViewUrl: 'https://example.com/live',
      };

      const received = onceEvent<ProgressContent>(module, 'progress');
      module.progress(content);
      assert.deepStrictEqual(await received, content);

      await run((done) => module.finalize(done));
    });

    it('should emit progress event with step content', async () => {
      const module = new TestModule();
      const content: ProgressContent = {
        type: 'aiBrowserProgress',
        event: 'step',
        stepIndex: 1,
        summary: 'Navigated to example.com',
        stepType: 'tool-call',
      };

      const received = onceEvent<ProgressContent>(module, 'progress');
      module.progress(content);
      assert.deepStrictEqual(await received, content);

      await run((done) => module.finalize(done));
    });
  });
});
