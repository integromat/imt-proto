import {Readable} from "stream";
import {ClientRequest} from "http";
import EventEmitter = NodeJS.EventEmitter;

declare namespace imtProto {

    // ====== IMTBase

    interface IMTBaseConstructor {
        MODULETYPE_NONE: number;
        MODULETYPE_TRIGGER: number;
        MODULETYPE_TRANSFORMER: number;
        MODULETYPE_ROUTER: number;
        MODULETYPE_ACTION: number;
        MODULETYPE_LISTENER: number;
        MODULETYPE_FEEDER: number;
        MODULETYPE_AGGREGATOR: number;
        MODULETYPE_DIRECTIVE: number;

        new (): IMTBase;
    }

    interface IMTBase {
        common: any;
        data: any;
        parameters: any;
        scenario: any;
        environment: any;
        type: number;

        initialize(done: (err: Error | null) => void): void;
        finalize(done: (err: Error | null) => void): void;
        commit(done: (err: Error | null, report: any[]) => void): void;
        warn(...args): void;
        debug(...args): void;
        log(...args): void;
        reset(): void;
        rollback(done: (err: Error | null, report: any[]) => void): void;
    }

    // ====== IMTAccount

    interface IMTAccountConstructor {
        new (): IMTAccount;
    }

    interface IMTOAuthAccountConstructor {
        new (): IMTOAuthAccount;
    }

    interface IMTAccount {
        common: any;
        data: any;

        initialize(done: (err: Error | null) => any);
        finalize(done: (err: Error | null) => any);
        test(done: (err: Error | null, isValid: boolean) => any);
        validate(done: (err: Error | null) => any)
    }

    interface IMTOAuthAccount extends IMTAccount {
        accountFromCallbackRequest(req: Readable);
        authorize(scope: string[], done: (err: Error | null, url: string) => any);
        callback(req: Readable, done: (err: Error | null) => any);
        extendScope(scope: string[], done: (err: Error | null, url: string) => any);
        reauthorize(done: (err: Error | null, url: string) => any);
    }

    // ====== IMTAction

    interface IMTActionConstructor extends IMTBaseConstructor {
        new (): IMTAction;
    }

    interface IMTAction extends IMTBase {
        write(bundle: any, done: (err: Error | null, done: any) => void): void;
    }

    interface IMTGatewayActionConstructor extends IMTActionConstructor {
        new (): IMTGatewayAction;
    }

    interface IMTGatewayAction extends IMTAction {

    }

    // ====== IMTAggregator

    interface IMTAggregatorConstructor extends IMTTransformerConstructor {
        new (): IMTAggregator;
    }

    interface IMTAggregator extends IMTTransformer {

    }

    // ====== IMTFeeder

    interface IMTFeederConstructor extends IMTTransformerConstructor {
        new (): IMTFeeder;
    }

    interface IMTFeeder extends IMTTransformer {
        transform(bundle: any, done: (err: Error | null, result: any) => void): void;
    }

    // ====== IMTHook

    interface IMTHookConstructor {
        new (): IMTHook;
    }

    interface IMTHook {
        initialize(done: (err: Error | null) => void): void;
        finalize(done: (err: Error | null) => void): void;
        parse(req: ClientRequest, done: (err: Error | null, items: any[]) => void): void;
    }

    // ====== IMTListener

    interface IMTListenerConstructor extends IMTBaseConstructor {
        new (): IMTListener;
    }

    interface IMTListener extends IMTBase {
        start(done: (err: Error | null) => void): void;
        stop(done: (err: Error | null) => void): void;
    }

    // ====== IMTRPC

    interface IMTRPCConstructor {
        new (): IMTRPC;
    }

    interface IMTRPC extends EventEmitter {
        common: any;
        parameters: any;
        environment: any;

        initialize(done: (err: Error | null) => void): void;
        finalize(done: (err: Error | null) => void): void;
        execute(done: (err: Error | null, result: any) => void): void;
    }

    // ====== IMTTransformer

    interface IMTTransformerConstructor extends IMTBaseConstructor {
        new (): IMTTransformer;
    }

    interface IMTTransformer extends IMTBase {
        transform(bundle: any, done: (err: Error | null, result: any) => void): void;
    }

    // ====== IMTTrigger

    interface IMTTriggerConstructor extends IMTBaseConstructor {
        new (): IMTTrigger;
    }

    interface IMTTrigger extends IMTBase {
        fetch(id: number, done: (err: Error | null) => void): void;
        read(done: (err: Error | null, result: any) => void): void;
    }

    // ====== Warning

    interface WarningConstructor {
        new (): Warning;
    }

    interface Warning {
        name: string;
        message: string;
        toString(): string;
        inspect(): string;
        toJSON(): {name: string, message: string, stack: any};
    }

    // ====== Errors

    interface Error {
        toJson(): {
            name: string,
            message: string,
            stack: any,
            hash?: string,
            bundle?: any,
            suberrors?: Error[],
            external?: any
        }
    }

    interface UnknownErrorConstructor {
        new (err: Error | string): UnknownError;
    }

    interface UnknownError extends Error {}

    interface RuntimeErrorConstructor {
        new (err: Error | string): RuntimeError;
    }

    interface RuntimeError extends Error {}

    interface DataErrorConstructor {
        new (err: Error | string): DataError;
    }

    interface DataError extends Error {}

    interface InconsistencyErrorConstructor {
        new (err: Error | string): InconsistencyError;
    }

    interface InconsistencyError extends Error {}

    interface RateLimitErrorConstructor {
        new (err: Error | string): RateLimitError;
    }

    interface RateLimitError extends Error {
        delay: number;
    }

    interface OutOfSpaceErrorConstructor {
        new (err: Error | string): OutOfSpaceError;
    }

    interface OutOfSpaceError extends Error {}

    interface ConnectionErrorConstructor {
        new (err: Error | string): ConnectionError;
    }

    interface ConnectionError extends Error {}

    interface InvalidConfigurationErrorConstructor {
        new (err: Error | string): InvalidConfigurationError;
    }

    interface InvalidConfigurationError extends Error {}

    interface InvalidAccessTokenErrorConstructor {
        new (err: Error | string): InvalidAccessTokenError;
    }

    interface InvalidAccessTokenError extends Error {}

    interface UnexpectedErrorConstructor {
        new (err: Error | string): UnexpectedError;
    }

    interface UnexpectedError extends Error {}

    interface MaxResultsExceededErrorConstructor {
        new (err: Error | string): MaxResultsExceededError;
    }

    interface MaxResultsExceededError extends Error {}

    interface MaxFileSizeExceededErrorConstructor {
        new (err: Error | string): MaxFileSizeExceededError;
    }

    interface MaxFileSizeExceededError extends Error {}

    interface IncompleteDataErrorConstructor {
        new (err: Error | string): IncompleteDataError;
    }

    interface IncompleteDataError extends Error {
        delay: number;
    }

    interface DuplicateDataErrorConstructor {
        new (err: Error | string): DuplicateDataError;
    }

    interface DuplicateDataError extends Error {}

    interface ModuleTimeoutErrorConstructor {
        new (err: Error | string): ModuleTimeoutError;
    }

    interface ModuleTimeoutError extends Error {}

    interface ScenarioTimeoutErrorConstructor {
        new (err: Error | string): ScenarioTimeoutError;
    }

    interface ScenarioTimeoutError extends Error {}

    interface OperationLimitExceededErrorConstructor {
        new (err: Error | string): OperationLimitExceededError;
    }

    interface OperationLimitExceededError extends Error {}

    interface DataSizeLimitExceededErrorConstructor {
        new (err: Error | string): DataSizeLimitExceededError;
    }

    interface DataSizeLimitExceededError extends Error {}

    interface ExecutionInterruptedErrorConstructor {
        new (err: Error | string): ExecutionInterruptedError;
    }

    interface ExecutionInterruptedError extends Error {}
}

// declare module "imt-proto" {
//     export = imtProto;
// }

declare const IMTBase: imtProto.IMTBaseConstructor;
declare const IMTAccount: imtProto.IMTAccountConstructor;
declare const IMTOAuthAccount: imtProto.IMTOAuthAccountConstructor;
declare const IMTAction: imtProto.IMTActionConstructor;
declare const IMTGatewayAction: imtProto.IMTGatewayActionConstructor;
declare const IMTAggregator: imtProto.IMTAggregatorConstructor;
declare const IMTFeeder: imtProto.IMTFeederConstructor;
declare const IMTHook: imtProto.IMTHookConstructor;
declare const IMTListener: imtProto.IMTListenerConstructor;
declare const IMTRPC: imtProto.IMTRPCConstructor;
declare const IMTTransformer: imtProto.IMTTransformerConstructor;
declare const IMTTrigger: imtProto.IMTTriggerConstructor;
declare const Warning: imtProto.Warning;

declare const UnknownError: imtProto.UnknownErrorConstructor;
declare const RuntimeError: imtProto.RuntimeErrorConstructor;
declare const DataError: imtProto.DataErrorConstructor;
declare const InconsistencyError: imtProto.InconsistencyErrorConstructor;
declare const RateLimitError: imtProto.RateLimitErrorConstructor;
declare const OutOfSpaceError: imtProto.OutOfSpaceErrorConstructor;
declare const ConnectionError: imtProto.ConnectionErrorConstructor;
declare const InvalidConfigurationError: imtProto.InvalidConfigurationErrorConstructor;
declare const InvalidAccessTokenError: imtProto.InvalidAccessTokenErrorConstructor;
declare const UnexpectedError: imtProto.UnexpectedErrorConstructor;
declare const MaxResultsExceededError: imtProto.MaxResultsExceededErrorConstructor;
declare const MaxFileSizeExceededError: imtProto.MaxFileSizeExceededErrorConstructor;
declare const IncompleteDataError: imtProto.IncompleteDataErrorConstructor;
declare const DuplicateDataError: imtProto.DuplicateDataErrorConstructor;
declare const ModuleTimeoutError: imtProto.ModuleTimeoutErrorConstructor;
declare const ScenarioTimeoutError: imtProto.ScenarioTimeoutErrorConstructor;
declare const OperationLimitExceededError: imtProto.OperationLimitExceededErrorConstructor;
declare const DataSizeLimitExceededError: imtProto.DataSizeLimitExceededErrorConstructor;
declare const ExecutionInterruptedError: imtProto.ExecutionInterruptedErrorConstructor;