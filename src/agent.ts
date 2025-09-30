import { IMTBase, ModuleType } from './base';
import { Bundle } from './types';

export type AgentResources = {
  agentOutputSpec: Readonly<Record<string, any>>;
  tools: Readonly<
    Array<
      Readonly<{
        id: number;
        name: string;
        description: string;
        inputSchema: Readonly<Record<string, any>>;
      }>
    >
  >;
};

export type AgentContext = Readonly<Record<string, any>>;

type SelectedTool = Readonly<{
  id: number;
  input: Readonly<Bundle>;
}>;

export type UseToolAction = Readonly<{
  type: 'useToolAction';
  selectedTool: SelectedTool;
  context: AgentContext;
}>;

export type FinishAction = Readonly<
  {
    type: 'finishAction';
  } & (
    | Readonly<{
        status: 'SUCCESS';
        outputBundle: Readonly<Bundle>;
      }>
    | Readonly<{
        status: 'ERROR';
        error: Error;
      }>
  )
>;

export type Action = UseToolAction | FinishAction;

export type InitialActionResult = Readonly<{
  type: 'initialActionResult';
  inputBundle: Readonly<Bundle>;
}>;

export type PreviousActionResultValue = Readonly<{
  toolOutputBundle: Readonly<Bundle>;
}>;

export type PreviousActionResult = Readonly<{
  type: 'previousActionResult';
  context: AgentContext;
  status: 'SUCCESS' | 'ERROR' | 'WARNING';
  previousAction: UseToolAction;
  previousActionResult: PreviousActionResultValue;
}>;

export type NextActionParams = InitialActionResult | PreviousActionResult;

export type ThreadHistoryRecord = Readonly<Record<any, any>>;
export type ThreadHistory = Readonly<Array<ThreadHistoryRecord>>;
export type ThreadContext = Readonly<{ threadHistory: ThreadHistory }>;

export type GetThreadContextParams = Readonly<{
  threadId?: string;
}>;

export class IMTAgent extends IMTBase {
  public readonly type = ModuleType.AGENT;

  getThreadContext(params: GetThreadContextParams): Promise<ThreadContext> {
    return Promise.resolve({ threadHistory: [] });
  }

  getNextAction(
    nextActionParams: Readonly<NextActionParams>,
    agentResources: Readonly<AgentResources>,
  ): Promise<Readonly<Action>> {
    throw new Error("Must override a superclass method 'getNextAction'.");
  }
}
