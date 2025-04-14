// noinspection ES6ConvertVarToLetConst

import * as publicApi from './index';
import './compatibility-extensions';

declare global {
  /* eslint-disable no-var */
  var IMT_PROTO_LOADED: boolean;
  var requireCommon: (name: string) => any;

  var IMTAggregator: typeof publicApi.IMTAggregator;
  var IMTAction: typeof publicApi.IMTAction;
  var IMTGatewayAction: typeof publicApi.IMTGatewayAction;
  var IMTGatewayResponder: typeof publicApi.IMTGatewayResponder;
  var Warning: typeof publicApi.Warning;
  var IMTHook: typeof publicApi.IMTHook;
  var IMTConverger: typeof publicApi.IMTConverger;
  var UnknownError: typeof publicApi.UnknownError;
  var RuntimeError: typeof publicApi.RuntimeError;
  var DataError: typeof publicApi.DataError;
  var InconsistencyError: typeof publicApi.InconsistencyError;
  var RateLimitError: typeof publicApi.RateLimitError;
  var OutOfSpaceError: typeof publicApi.OutOfSpaceError;
  var ConnectionError: typeof publicApi.ConnectionError;
  var InvalidConfigurationError: typeof publicApi.InvalidConfigurationError;
  var InvalidAccessTokenError: typeof publicApi.InvalidAccessTokenError;
  var UnexpectedError: typeof publicApi.UnexpectedError;
  var MaxResultsExceededError: typeof publicApi.MaxResultsExceededError;
  var MaxFileSizeExceededError: typeof publicApi.MaxFileSizeExceededError;
  var IncompleteDataError: typeof publicApi.IncompleteDataError;
  var DuplicateDataError: typeof publicApi.DuplicateDataError;
  var ModuleTimeoutError: typeof publicApi.ModuleTimeoutError;
  var ScenarioTimeoutError: typeof publicApi.ScenarioTimeoutError;
  var OperationsLimitExceededError: typeof publicApi.OperationsLimitExceededError;
  var DataSizeLimitExceededError: typeof publicApi.DataSizeLimitExceededError;
  var ExecutionInterruptedError: typeof publicApi.ExecutionInterruptedError;
  var IMTRouter: typeof publicApi.IMTRouter;
  var IMTListener: typeof publicApi.IMTListener;
  var IMTAccount: typeof publicApi.IMTAccount;
  var IMTOAuthAccount: typeof publicApi.IMTOAuthAccount;
  var IMTTrigger: typeof publicApi.IMTTrigger;
  var IMTGatewayTrigger: typeof publicApi.IMTGatewayTrigger;
  var IMTPauser: typeof publicApi.IMTPauser;
  var IMTBase: typeof publicApi.IMTBase;
  var IMTRPC: typeof publicApi.IMTRPC;
  var IMTFeeder: typeof publicApi.IMTFeeder;
  var IMTTransformer: typeof publicApi.IMTTransformer;
  var IMTHITL: typeof publicApi.IMTHITL;
  var IMTReturner: typeof publicApi.IMTReturner;
  var IMTStarter: typeof publicApi.IMTStarter;
  /* eslint-enable no-var */
}

if (!global.IMT_PROTO_LOADED) {
  global.IMT_PROTO_LOADED = true;

  /**
   * Require a module from a common collection of preloaded modules. This method is set later by Integration's core.
   *
   * @param {String} name Module nane.
   * @returns {*}
   */
  if (!global.requireCommon) global.requireCommon = () => null;

  global.IMTAggregator = publicApi.IMTAggregator;
  global.IMTAction = publicApi.IMTAction;
  global.IMTGatewayAction = publicApi.IMTGatewayAction;
  global.IMTGatewayResponder = publicApi.IMTGatewayResponder;
  global.Warning = publicApi.Warning;
  global.IMTHook = publicApi.IMTHook;
  global.IMTConverger = publicApi.IMTConverger;
  global.UnknownError = publicApi.UnknownError;
  global.RuntimeError = publicApi.RuntimeError;
  global.DataError = publicApi.DataError;
  global.InconsistencyError = publicApi.InconsistencyError;
  global.RateLimitError = publicApi.RateLimitError;
  global.OutOfSpaceError = publicApi.OutOfSpaceError;
  global.ConnectionError = publicApi.ConnectionError;
  global.InvalidConfigurationError = publicApi.InvalidConfigurationError;
  global.InvalidAccessTokenError = publicApi.InvalidAccessTokenError;
  global.UnexpectedError = publicApi.UnexpectedError;
  global.MaxResultsExceededError = publicApi.MaxResultsExceededError;
  global.MaxFileSizeExceededError = publicApi.MaxFileSizeExceededError;
  global.IncompleteDataError = publicApi.IncompleteDataError;
  global.DuplicateDataError = publicApi.DuplicateDataError;
  global.ModuleTimeoutError = publicApi.ModuleTimeoutError;
  global.ScenarioTimeoutError = publicApi.ScenarioTimeoutError;
  global.OperationsLimitExceededError = publicApi.OperationsLimitExceededError;
  global.DataSizeLimitExceededError = publicApi.DataSizeLimitExceededError;
  global.ExecutionInterruptedError = publicApi.ExecutionInterruptedError;
  global.IMTRouter = publicApi.IMTRouter;
  global.IMTListener = publicApi.IMTListener;
  global.IMTAccount = publicApi.IMTAccount;
  global.IMTOAuthAccount = publicApi.IMTOAuthAccount;
  global.IMTTrigger = publicApi.IMTTrigger;
  global.IMTGatewayTrigger = publicApi.IMTGatewayTrigger;
  global.IMTPauser = publicApi.IMTPauser;
  global.IMTBase = publicApi.IMTBase;
  global.IMTRPC = publicApi.IMTRPC;
  global.IMTFeeder = publicApi.IMTFeeder;
  global.IMTTransformer = publicApi.IMTTransformer;
  global.IMTHITL = publicApi.IMTHITL;
  global.IMTReturner = publicApi.IMTReturner;
  global.IMTStarter = publicApi.IMTStarter;
}
