import {Readable} from "stream";
import {ClientRequest} from "http";
import {EventEmitter} from "events";

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

    export interface IMTBase {
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

    // ====== IMTAccount

    interface IMTAccountConstructor {
        new (): IMTAccount;
    }

    interface IMTOAuthAccountConstructor {
        new (): IMTOAuthAccount;
    }

    export interface IMTAccount {
        common: any;
        data: any;

        initialize(done: (err?: Error) => any);
        finalize(done: (err?: Error) => any);
        test(done: (err: Error | null, isValid: boolean) => any);
        validate(done: (err?: Error) => any)
    }

    export interface IMTOAuthAccount extends IMTAccount {
        accountFromCallbackRequest(req: Readable);
        authorize(scope: string[], done: (err: Error | null, url: string) => any);
        callback(req: Readable, done: (err?: Error) => any);
        extendScope(scope: string[], done: (err: Error | null, url: string) => any);
        reauthorize(done: (err: Error | null, url: string) => any);
    }

    // ====== IMTAction

    interface IMTActionConstructor extends IMTBaseConstructor {
        new (): IMTAction;
    }

    export interface IMTAction extends IMTBase {
        write(bundle: any, done: (err: Error | null, done: any) => void): void;
    }

    interface IMTGatewayActionConstructor extends IMTActionConstructor {
        new (): IMTGatewayAction;
    }

    export interface IMTGatewayAction extends IMTAction {

    }

    // ====== IMTAggregator

    interface IMTAggregatorConstructor extends IMTTransformerConstructor {
        new (): IMTAggregator;
    }

    export interface IMTAggregator extends IMTTransformer {

    }

    // ====== IMTFeeder

    interface IMTFeederConstructor extends IMTTransformerConstructor {
        new (): IMTFeeder;
    }

    export interface IMTFeeder extends IMTTransformer {
        transform(bundle: any, done: (err: Error | null, result: any) => void): void;
    }

    // ====== IMTHook

    interface IMTHookConstructor {
        new (): IMTHook;
    }

    export interface IMTHook {
        initialize(done: (err?: Error) => void): void;
        finalize(done: (err?: Error) => void): void;
        parse(req: ClientRequest, done: (err: Error | null, items: any[]) => void): void;
    }

    // ====== IMTListener

    interface IMTListenerConstructor extends IMTBaseConstructor {
        new (): IMTListener;
    }

    export interface IMTListener extends IMTBase {
        start(done: (err?: Error) => void): void;
        stop(done: (err?: Error) => void): void;
    }

    // ====== IMTRPC

    interface IMTRPCConstructor {
        new (): IMTRPC;
    }

    export interface IMTRPC extends EventEmitter {
        common: any;
        parameters: any;
        environment: any;

        initialize(done: (err?: Error) => void): void;
        finalize(done: (err?: Error) => void): void;
        execute(done: (err: Error | null, result: any) => void): void;
    }

    // ====== IMTTransformer

    interface IMTTransformerConstructor extends IMTBaseConstructor {
        new (): IMTTransformer;
    }

    export interface IMTTransformer extends IMTBase {
        transform(bundle: any, done: (err: Error | null, result: any) => void): void;
    }

    // ====== IMTTrigger

    interface IMTTriggerConstructor extends IMTBaseConstructor {
        new (): IMTTrigger;
    }

    export interface IMTTrigger extends IMTBase {
        fetch(id: number, done: (err?: Error) => void): void;
        read(done: (err: Error | null, result: any) => void): void;
    }

    // ====== Warning

    interface WarningConstructor {
        new (): Warning;
    }

    export interface Warning {
        name: string;
        message: string;
        toString(): string;
        inspect(): string;
        toJSON(): {name: string, message: string, stack: any};
    }

    // ====== Errors

    export interface Error {
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

    export interface UnknownError extends Error {}

    interface RuntimeErrorConstructor {
        new (err: Error | string): RuntimeError;
    }

    export interface RuntimeError extends Error {}

    interface DataErrorConstructor {
        new (err: Error | string): DataError;
    }

    export interface DataError extends Error {}

    interface InconsistencyErrorConstructor {
        new (err: Error | string): InconsistencyError;
    }

    export interface InconsistencyError extends Error {}

    interface RateLimitErrorConstructor {
        new (err: Error | string): RateLimitError;
    }

    export interface RateLimitError extends Error {
        delay: number;
    }

    interface OutOfSpaceErrorConstructor {
        new (err: Error | string): OutOfSpaceError;
    }

    export interface OutOfSpaceError extends Error {}

    interface ConnectionErrorConstructor {
        new (err: Error | string): ConnectionError;
    }

    export interface ConnectionError extends Error {}

    interface InvalidConfigurationErrorConstructor {
        new (err: Error | string): InvalidConfigurationError;
    }

    export interface InvalidConfigurationError extends Error {}

    interface InvalidAccessTokenErrorConstructor {
        new (err: Error | string): InvalidAccessTokenError;
    }

    export interface InvalidAccessTokenError extends Error {}

    interface UnexpectedErrorConstructor {
        new (err: Error | string): UnexpectedError;
    }

    export interface UnexpectedError extends Error {}

    interface MaxResultsExceededErrorConstructor {
        new (err: Error | string): MaxResultsExceededError;
    }

    export interface MaxResultsExceededError extends Error {}

    interface MaxFileSizeExceededErrorConstructor {
        new (err: Error | string): MaxFileSizeExceededError;
    }

    export interface MaxFileSizeExceededError extends Error {}

    interface IncompleteDataErrorConstructor {
        new (err: Error | string): IncompleteDataError;
    }

    export interface IncompleteDataError extends Error {
        delay: number;
    }

    interface DuplicateDataErrorConstructor {
        new (err: Error | string): DuplicateDataError;
    }

    export interface DuplicateDataError extends Error {}

    interface ModuleTimeoutErrorConstructor {
        new (err: Error | string): ModuleTimeoutError;
    }

    export interface ModuleTimeoutError extends Error {}

    interface ScenarioTimeoutErrorConstructor {
        new (err: Error | string): ScenarioTimeoutError;
    }

    export interface ScenarioTimeoutError extends Error {}

    interface OperationLimitExceededErrorConstructor {
        new (err: Error | string): OperationLimitExceededError;
    }

    export interface OperationLimitExceededError extends Error {}

    interface DataSizeLimitExceededErrorConstructor {
        new (err: Error | string): DataSizeLimitExceededError;
    }

    export interface DataSizeLimitExceededError extends Error {}

    interface ExecutionInterruptedErrorConstructor {
        new (err: Error | string): ExecutionInterruptedError;
    }

    export interface ExecutionInterruptedError extends Error {}
}

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

export = imtProto;