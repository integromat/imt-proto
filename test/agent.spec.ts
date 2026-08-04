import * as assert from 'assert';
import { IMTBase, ModuleType } from '../src/base';
import { IMTAgent, Action, AgentResources, NextActionParams } from '../src/agent';

const resources: AgentResources = {
  agentOutputSpec: {},
  tools: [],
  flags: { hasNestedAgents: false, isNestedAgent: false },
};

const initialParams: NextActionParams = {
  type: 'initialActionResult',
  inputBundle: { prompt: 'hi' },
};

class TestAgent extends IMTAgent {
  async getNextAction(): Promise<Action> {
    return { type: 'finishAction', status: 'SUCCESS', outputBundle: { answer: 42 } };
  }
}

describe('IMTAgent', () => {
  it('should have AGENT type and extend IMTBase', () => {
    const agent = new TestAgent();
    assert.ok(agent instanceof IMTBase);
    assert.strictEqual(agent.type, ModuleType.AGENT);
  });

  it('getThreadContext should resolve to an empty history by default', async () => {
    const context = await new TestAgent().getThreadContext({ threadId: 't1' });
    assert.deepStrictEqual(context, { history: { records: [] } });
  });

  it('getNextAction should throw when not overridden', () => {
    assert.throws(() => new IMTAgent().getNextAction(initialParams, resources), /getNextAction/);
  });

  it('getNextAction should resolve to an action when overridden', async () => {
    const action = await new TestAgent().getNextAction(initialParams, resources);
    assert.deepStrictEqual(action, {
      type: 'finishAction',
      status: 'SUCCESS',
      outputBundle: { answer: 42 },
    });
  });
});
