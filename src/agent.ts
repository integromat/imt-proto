import { IMTBase, ModuleType } from './base';
import { Bundle, Metadata, MetadataList } from './types';

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
  /**
   * Nested-agent flags derived by the engine from the blueprint structure.
   * The AI agents backend cannot tell root and nested agent runs apart from the
   * ISC context alone, so the engine computes them and passes them alongside the
   * resources. Grouped under `flags` to keep them out of the resources root.
   */
  flags: Readonly<{
    hasNestedAgents: boolean;
    isNestedAgent: boolean;
  }>;
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
  reasoning?: Readonly<string>;
  content?: Readonly<string>;
  /** Model's input token limit, as reported by the agents backend. Absent = unknown. */
  contextWindow?: Readonly<number>;
}>;

export type InternalToolCall = Readonly<{
  toolCallId: string;
  name: string;
  input: Readonly<Bundle>;
}>;

export type UseInternalToolAction = Readonly<{
  type: 'useInternalToolAction';
  internalTool: InternalToolCall;
  context: AgentContext;
  reasoning?: Readonly<string>;
  content?: Readonly<string>;
  /** Model's input token limit, as reported by the agents backend. Absent = unknown. */
  contextWindow?: Readonly<number>;
}>;

export type InternalToolResultAction = Readonly<
  {
    type: 'internalToolResultAction';
    toolCallId: string;
    context: AgentContext;
    executionTime?: number;
  } & (
    | Readonly<{ status: 'SUCCESS'; toolOutputBundle: Readonly<Bundle> }>
    | Readonly<{ status: 'ERROR'; error: Error }>
  )
>;

export type FinishAction = Readonly<
  {
    type: 'finishAction';
    metadata?: Readonly<MetadataList>;
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

export type Action = UseToolAction | UseInternalToolAction | InternalToolResultAction | FinishAction;

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
  previousAction: UseToolAction | UseInternalToolAction;
  previousActionResult: PreviousActionResultValue;
}>;

export type ExecuteInternalToolParams = Readonly<{
  type: 'executeInternalToolParams';
  internalTool: InternalToolCall;
  context: AgentContext;
}>;

export type NextActionParams = InitialActionResult | PreviousActionResult | ExecuteInternalToolParams;

export type ThreadHistoryRecord = Readonly<Record<any, any>>;
export type ThreadHistory = Readonly<{
  records: Readonly<Array<ThreadHistoryRecord>>;
}>;
export type ThreadContext = Readonly<{ history: ThreadHistory }>;

export type GetThreadContextParams = Readonly<{
  threadId: string;
  iterationsFromHistoryCount?: number;
}>;

export class IMTAgent extends IMTBase {
  public readonly type = ModuleType.AGENT;

  getThreadContext(params: GetThreadContextParams): Promise<ThreadContext> {
    return Promise.resolve({ history: { records: [] } });
  }

  getNextAction(
    nextActionParams: Readonly<NextActionParams>,
    agentResources: Readonly<AgentResources>,
  ): Promise<Readonly<Action>> {
    throw new Error("Must override a superclass method 'getNextAction'.");
  }
}
