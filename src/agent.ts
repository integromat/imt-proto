import { IMTBase, ModuleType } from './base';

export type RegisterToolsParams = {
  tools: Array<{
    id: number;
    name: string;
    description: string;
    inputSchema: {
      [key: string]: any; // <- spec schema from blueprint
    };
  }>;
};

export type UseToolAction = {
  type: 'useToolAction';
  toolId: number;
  data: Record<string, any>;
};

export type FinishAction = {
  type: 'finishAction';
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
  data: Record<string, any>;
};

export type Action = UseToolAction | FinishAction;

export type InitialActionResult = {
  type: 'initialActionResult';
  data: Record<string, any>;
};

export type PreviousActionResult = {
  type: 'previousActionResult';
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
  data: Record<string, any>;
};

type NextActionParams = InitialActionResult | PreviousActionResult;

export abstract class IMTAgent extends IMTBase {
  public readonly type = ModuleType.AGENT;

  registerTools(params: RegisterToolsParams): void {
    throw new Error("Must override a superclass method 'registerTools'.");
  }

  async getNextAction(params: NextActionParams): Promise<Action> {
    throw new Error("Must override a superclass method 'getNextAction'.");
  }
}
