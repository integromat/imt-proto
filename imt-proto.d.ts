import {Readable} from "stream";
import {ClientRequest} from "http";
import {EventEmitter} from "events";

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
    new (err: Error | string): imtProto.RuntimeError;
}
interface DataErrorConstructor {
    new (err: Error | string): imtProto.DataError;
}
interface InconsistencyErrorConstructor {
    new (err: Error | string): imtProto.InconsistencyError;
}
interface RateLimitErrorConstructor {
    new (err: Error | string): imtProto.RateLimitError;
}
interface OutOfSpaceErrorConstructor {
    new (err: Error | string): imtProto.OutOfSpaceError;
}
interface ConnectionErrorConstructor {
    new (err: Error | string): imtProto.ConnectionError;
}
interface InvalidConfigurationErrorConstructor {
    new (err: Error | string): imtProto.InvalidConfigurationError;
}
interface InvalidAccessTokenErrorConstructor {
    new (err: Error | string): imtProto.InvalidAccessTokenError;
}
interface UnexpectedErrorConstructor {
    new (err: Error | string): imtProto.UnexpectedError;
}
interface MaxResultsExceededErrorConstructor {
    new (err: Error | string): imtProto.MaxResultsExceededError;
}
interface MaxFileSizeExceededErrorConstructor {
    new (err: Error | string): imtProto.MaxFileSizeExceededError;
}
interface IncompleteDataErrorConstructor {
    new (err: Error | string): imtProto.IncompleteDataError;
}
interface DuplicateDataErrorConstructor {
    new (err: Error | string): imtProto.DuplicateDataError;
}
interface ModuleTimeoutErrorConstructor {
    new (err: Error | string): imtProto.ModuleTimeoutError;
}
interface ScenarioTimeoutErrorConstructor {
    new (err: Error | string): imtProto.ScenarioTimeoutError;
}
interface OperationLimitExceededErrorConstructor {
    new (err: Error | string): imtProto.OperationLimitExceededError;
}
interface DataSizeLimitExceededErrorConstructor {
    new (err: Error | string): imtProto.DataSizeLimitExceededError;
}
interface ExecutionInterruptedErrorConstructor {
    new (err: Error | string): imtProto.ExecutionInterruptedError;
}

namespace imtProto {
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

export = imtProto;