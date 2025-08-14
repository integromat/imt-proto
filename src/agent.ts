import { IMTBase, ModuleType } from './base';

export type AgentResources = {
  agentOutputSpec: Record<string, any>;
  tools: Array<{
    id: number;
    name: string;
    description: string;
    inputSpecification: {
      [key: string]: any; // <- spec schema from blueprint
    };
  }>;
};

export type Context = Record<string, any>;

export type UseToolAction = {
  type: 'useToolAction';
  toolId: number;
  context: Context;
  data: Record<string, any>;
};

export type FinishAction = {
  type: 'finishAction';
  status: 'SUCCESS' | 'ERROR' | 'WARNING';
  data: Record<string, any>;
};

export type Action = UseToolAction | FinishAction;

export type InitialActionResult = {
  type: 'initialActionResult';
  data: Record<string, any>;
};

export type PreviousActionResult = {
  type: 'previousActionResult';
  context: Context;
  status: 'SUCCESS' | 'ERROR' | 'WARNING';
  data: Record<string, any>;
};

type NextActionParams = InitialActionResult | PreviousActionResult;

export abstract class IMTAgent extends IMTBase {
  public readonly type = ModuleType.AGENT;

  abstract getNextAction(nextActionParams: NextActionParams, agentResources: AgentResources): Promise<Action>;
}
