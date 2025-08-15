import { IMTBase, ModuleType } from './base';
import { Bundle } from './types';

export type AgentResources = {
  agentOutputSpec: Record<string, any>;
  tools: Array<{
    id: number;
    name: string;
    description: string;
    inputSpecification: Record<string, any>;
  }>;
};

export type AgentContext = Record<string, any>;

export type UseToolAction = {
  type: 'useToolAction';
  selectedTool: {
    id: number;
    input: Bundle;
  };
  context: AgentContext;
};

export type FinishAction = {
  type: 'finishAction';
  status: 'SUCCESS' | 'ERROR' | 'WARNING';
  outputBundle: Bundle;
};

export type Action = UseToolAction | FinishAction;

export type InitialActionResult = {
  type: 'initialActionResult';
  inputBundle: Bundle;
};
export type PreviousActionResultValue = {
  toolOutputBundle: Bundle;
};
export type PreviousActionResult = {
  type: 'previousActionResult';
  context: AgentContext;
  status: 'SUCCESS' | 'ERROR' | 'WARNING';
  previousAction: UseToolAction;
  previousActionResult: PreviousActionResultValue;
};

type NextActionParams = InitialActionResult | PreviousActionResult;

export class IMTAgent extends IMTBase {
  public readonly type = ModuleType.AGENT;

  getNextAction(nextActionParams: NextActionParams, agentResources: AgentResources): Promise<Action> {
    throw new Error("Must override a superclass method 'write'.");
  }
}
