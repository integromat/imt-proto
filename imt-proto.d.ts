interface IMTBaseConstructor {
    new (): imtProto.IMTBase;
}
interface IMTAccountConstructor {
    new (): imtProto.IMTAccount;
}
interface IMTOAuthAccountConstructor {
    new (): imtProto.IMTOAuthAccount;
}
interface IMTActionConstructor {
    new (): imtProto.IMTAction;
}
interface IMTGatewayActionConstructor {
    new (): imtProto.IMTGatewayAction;
}
interface IMTAggregatorConstructor {
    new (): imtProto.IMTAggregator;
}
interface IMTConvergerConstructor {
    new (): imtProto.IMTConverger;
}
interface IMTRouterConstructor {
    new (): imtProto.IMTRouter;
}
interface IMTHITLConstructor {
    new (): imtProto.IMTHITL;
}
interface IMTFeederConstructor {
    new (): imtProto.IMTFeeder;
}
interface IMTHookConstructor {
    new (): imtProto.IMTHook;
}
interface IMTListenerConstructor {
    new (): imtProto.IMTListener;
}
interface IMTRPCConstructor {
    new (): imtProto.IMTRPC;
}
interface IMTTransformerConstructor {
    new (): imtProto.IMTTransformer;
}
interface IMTTriggerConstructor {
    new (): imtProto.IMTTrigger;
}
interface WarningConstructor {
    new (): imtProto.Warning;
}
interface UnknownErrorConstructor {
    new (err: Error | string): imtProto.UnknownError;
}
interface RuntimeErrorConstructor {
    new (message: string): imtProto.RuntimeError;
}
interface DataErrorConstructor {
    new (message: string): imtProto.DataError;
}
interface InconsistencyErrorConstructor {
    new (message: string): imtProto.InconsistencyError;
}
interface RateLimitErrorConstructor {
    new (message: string, delay: number): imtProto.RateLimitError;
}
interface OutOfSpaceErrorConstructor {
    new (message: string): imtProto.OutOfSpaceError;
}
interface ConnectionErrorConstructor {
    new (message: string): imtProto.ConnectionError;
}
interface InvalidConfigurationErrorConstructor {
    new (message: string): imtProto.InvalidConfigurationError;
}
interface InvalidAccessTokenErrorConstructor {
    new (message: string): imtProto.InvalidAccessTokenError;
}
interface UnexpectedErrorConstructor {
    new (message: string): imtProto.UnexpectedError;
}
interface MaxResultsExceededErrorConstructor {
    new (message: string): imtProto.MaxResultsExceededError;
}
interface MaxFileSizeExceededErrorConstructor {
    new (message: string): imtProto.MaxFileSizeExceededError;
}
interface IncompleteDataErrorConstructor {
    new (message: string, delay: number): imtProto.IncompleteDataError;
}
interface DuplicateDataErrorConstructor {
    new (message: string): imtProto.DuplicateDataError;
}
interface ModuleTimeoutErrorConstructor {
    new (message: string): imtProto.ModuleTimeoutError;
}
interface ScenarioTimeoutErrorConstructor {
    new (message: string): imtProto.ScenarioTimeoutError;
}
interface OperationLimitExceededErrorConstructor {
    new (message: string): imtProto.OperationLimitExceededError;
}
interface DataSizeLimitExceededErrorConstructor {
    new (message: string): imtProto.DataSizeLimitExceededError;
}
interface ExecutionInterruptedErrorConstructor {
    new (message: string): imtProto.ExecutionInterruptedError;
}

declare namespace imtProto {
    import {Readable} from "stream";
    import {ClientRequest} from "http";
    import {EventEmitter} from "events";

    interface IMTBase {
        MODULETYPE_NONE: number;
        MODULETYPE_TRIGGER: number;
        MODULETYPE_TRANSFORMER: number;
        MODULETYPE_ROUTER: number;
        MODULETYPE_ACTION: number;
        MODULETYPE_LISTENER: number;
        MODULETYPE_FEEDER: number;
        MODULETYPE_AGGREGATOR: number;
        MODULETYPE_DIRECTIVE: number;

        common: any;
        data: any;
        parameters: any;
        scenario: any;
        environment: any;
        type: number;

        initialize(done: (err?: Error) => void): void;
        finalize(done: (err?: Error) => void): void;
        commit(done: (err: Error | null, report: any[]) => void): void;
        warn(...args): void;
        debug(...args): void;
        log(...args): void;
        reset(): void;
        rollback(done: (err: Error | null, report: any[]) => void): void;
    }
    interface IMTAccount {
        common: any;
        data: any;

        initialize(done: (err?: Error) => any);
        finalize(done: (err?: Error) => any);
        test(done: (err: Error | null, isValid: boolean) => any);
        validate(done: (err?: Error) => any)
    }
    interface IMTOAuthAccount extends IMTAccount {
        accountFromCallbackRequest(req: Readable);
        authorize(scope: string[], done: (err: Error | null, url: string) => any);
        callback(req: Readable, done: (err?: Error) => any);
        extendScope(scope: string[], done: (err: Error | null, url: string) => any);
        reauthorize(done: (err: Error | null, url: string) => any);
    }
    interface IMTAction extends IMTBase {
        write(bundle: any, done: (err: Error | null, done: any) => void): void;
    }
    interface IMTGatewayAction extends IMTAction {}
    interface IMTAggregator extends IMTTransformer {}
    interface IMTConverger extends IMTBase {}
    interface IMTRouter extends IMTBase {}
    interface IMTHITL extends IMTBase {
        execute(bundle: any, done: (err: Error | null, done: any) => void): void;
    }
    interface IMTFeeder extends IMTTransformer {
        transform(bundle: any, done: (err: Error | null, result: any) => void): void;
    }
    interface IMTHook {
        initialize(done: (err?: Error) => void): void;
        finalize(done: (err?: Error) => void): void;
        parse(req: ClientRequest, done: (err: Error | null, items: any[]) => void): void;
    }
    interface IMTListener extends IMTBase {
        start(done: (err?: Error) => void): void;
        stop(done: (err?: Error) => void): void;
    }
    interface IMTRPC extends EventEmitter {
        common: any;
        parameters: any;
        environment: any;

        initialize(done: (err?: Error) => void): void;
        finalize(done: (err?: Error) => void): void;
        execute(done: (err: Error | null, result: any) => void): void;
    }
    interface IMTTransformer extends IMTBase {
        transform(bundle: any, done: (err: Error | null, result: any) => void): void;
    }
    interface IMTTrigger extends IMTBase {
        fetch(id: number, done: (err?: Error) => void): void;
        read(done: (err: Error | null, result: any) => void): void;
    }
    interface Warning {
        name: string;
        message: string;
        toString(): string;
        inspect(): string;
        toJSON(): {name: string, message: string, stack: any};
    }
    interface Error {
        toJSON(): {
            name: string,
            message: string,
            stack: any,
            hash?: string,
            bundle?: any,
            suberrors?: Error[],
            external?: any
        }
    }
    interface UnknownError extends Error {}
    interface RuntimeError extends Error {}
    interface DataError extends Error {}
    interface InconsistencyError extends Error {}
    interface RateLimitError extends Error {
        delay: number;
    }
    interface OutOfSpaceError extends Error {}
    interface ConnectionError extends Error {}
    interface InvalidConfigurationError extends Error {}
    interface InvalidAccessTokenError extends Error {}
    interface UnexpectedError extends Error {}
    interface MaxResultsExceededError extends Error {}
    interface MaxFileSizeExceededError extends Error {}
    interface IncompleteDataError extends Error {
        delay: number;
    }
    interface DuplicateDataError extends Error {}
    interface ModuleTimeoutError extends Error {}
    interface ScenarioTimeoutError extends Error {}
    interface OperationLimitExceededError extends Error {}
    interface DataSizeLimitExceededError extends Error {}
    interface ExecutionInterruptedError extends Error {}
}

declare const IMTBase: IMTBaseConstructor;
declare const IMTAccount: IMTAccountConstructor;
declare const IMTOAuthAccount: IMTOAuthAccountConstructor;
declare const IMTAction: IMTActionConstructor;
declare const IMTGatewayAction: IMTGatewayActionConstructor;
declare const IMTAggregator: IMTAggregatorConstructor;
declare const IMTConverger: IMTConvergerConstructor;
declare const IMTRouter: IMTRouterConstructor;
declare const IMTHITL: IMTHITLConstructor;
declare const IMTFeeder: IMTFeederConstructor;
declare const IMTHook: IMTHookConstructor;
declare const IMTListener: IMTListenerConstructor;
declare const IMTRPC: IMTRPCConstructor;
declare const IMTTransformer: IMTTransformerConstructor;
declare const IMTTrigger: IMTTriggerConstructor;
declare const Warning: WarningConstructor;

declare const UnknownError: UnknownErrorConstructor;
declare const RuntimeError: RuntimeErrorConstructor;
declare const DataError: DataErrorConstructor;
declare const InconsistencyError: InconsistencyErrorConstructor;
declare const RateLimitError: RateLimitErrorConstructor;
declare const OutOfSpaceError: OutOfSpaceErrorConstructor;
declare const ConnectionError: ConnectionErrorConstructor;
declare const InvalidConfigurationError: InvalidConfigurationErrorConstructor;
declare const InvalidAccessTokenError: InvalidAccessTokenErrorConstructor;
declare const UnexpectedError: UnexpectedErrorConstructor;
declare const MaxResultsExceededError: MaxResultsExceededErrorConstructor;
declare const MaxFileSizeExceededError: MaxFileSizeExceededErrorConstructor;
declare const IncompleteDataError: IncompleteDataErrorConstructor;
declare const DuplicateDataError: DuplicateDataErrorConstructor;
declare const ModuleTimeoutError: ModuleTimeoutErrorConstructor;
declare const ScenarioTimeoutError: ScenarioTimeoutErrorConstructor;
declare const OperationLimitExceededError: OperationLimitExceededErrorConstructor;
declare const DataSizeLimitExceededError: DataSizeLimitExceededErrorConstructor;
declare const ExecutionInterruptedError: ExecutionInterruptedErrorConstructor;