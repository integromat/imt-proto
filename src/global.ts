// noinspection ES6ConvertVarToLetConst

import * as imtProto from './index';
import './compatibility-extensions';

declare global {
  /* eslint-disable no-var */
  var IMT_PROTO_LOADED: boolean;
  var requireCommon: (name: string) => any;

  var IMTAggregator: typeof imtProto.IMTAggregator;
  var IMTAction: typeof imtProto.IMTAction;
  var IMTGatewayAction: typeof imtProto.IMTGatewayAction;
  var IMTGatewayResponder: typeof imtProto.IMTGatewayResponder;
  var Warning: typeof imtProto.Warning;
  var IMTHook: typeof imtProto.IMTHook;
  var IMTConverger: typeof imtProto.IMTConverger;
  var UnknownError: typeof imtProto.UnknownError;
  var RuntimeError: typeof imtProto.RuntimeError;
  var DataError: typeof imtProto.DataError;
  var InconsistencyError: typeof imtProto.InconsistencyError;
  var RateLimitError: typeof imtProto.RateLimitError;
  var OutOfSpaceError: typeof imtProto.OutOfSpaceError;
  var ConnectionError: typeof imtProto.ConnectionError;
  var InvalidConfigurationError: typeof imtProto.InvalidConfigurationError;
  var InvalidAccessTokenError: typeof imtProto.InvalidAccessTokenError;
  var UnexpectedError: typeof imtProto.UnexpectedError;
  var MaxResultsExceededError: typeof imtProto.MaxResultsExceededError;
  var MaxFileSizeExceededError: typeof imtProto.MaxFileSizeExceededError;
  var IncompleteDataError: typeof imtProto.IncompleteDataError;
  var DuplicateDataError: typeof imtProto.DuplicateDataError;
  var ModuleTimeoutError: typeof imtProto.ModuleTimeoutError;
  var ScenarioTimeoutError: typeof imtProto.ScenarioTimeoutError;
  var OperationsLimitExceededError: typeof imtProto.OperationsLimitExceededError;
  var DataSizeLimitExceededError: typeof imtProto.DataSizeLimitExceededError;
  var ExecutionInterruptedError: typeof imtProto.ExecutionInterruptedError;
  var IMTRouter: typeof imtProto.IMTRouter;
  var IMTListener: typeof imtProto.IMTListener;
  var IMTAccount: typeof imtProto.IMTAccount;
  var IMTOAuthAccount: typeof imtProto.IMTOAuthAccount;
  var IMTTrigger: typeof imtProto.IMTTrigger;
  var IMTGatewayTrigger: typeof imtProto.IMTGatewayTrigger;
  var IMTPauser: typeof imtProto.IMTPauser;
  var IMTBase: typeof imtProto.IMTBase;
  var IMTRPC: typeof imtProto.IMTRPC;
  var IMTFeeder: typeof imtProto.IMTFeeder;
  var IMTTransformer: typeof imtProto.IMTTransformer;
  /* eslint-enable no-var */
}

if (!global.IMT_PROTO_LOADED) {
  global.IMT_PROTO_LOADED = true;

  /**
   * Require module from common collection of preloaded modules. This method is set later by Integration's core.
   *
   * @param {String} name Module nane.
   * @returns {*}
   */
  if (!global.requireCommon) global.requireCommon = () => null;

  global.IMTAggregator = imtProto.IMTAggregator;
  global.IMTAction = imtProto.IMTAction;
  global.IMTGatewayAction = imtProto.IMTGatewayAction;
  global.IMTGatewayResponder = imtProto.IMTGatewayResponder;
  global.Warning = imtProto.Warning;
  global.IMTHook = imtProto.IMTHook;
  global.IMTConverger = imtProto.IMTConverger;
  global.UnknownError = imtProto.UnknownError;
  global.RuntimeError = imtProto.RuntimeError;
  global.DataError = imtProto.DataError;
  global.InconsistencyError = imtProto.InconsistencyError;
  global.RateLimitError = imtProto.RateLimitError;
  global.OutOfSpaceError = imtProto.OutOfSpaceError;
  global.ConnectionError = imtProto.ConnectionError;
  global.InvalidConfigurationError = imtProto.InvalidConfigurationError;
  global.InvalidAccessTokenError = imtProto.InvalidAccessTokenError;
  global.UnexpectedError = imtProto.UnexpectedError;
  global.MaxResultsExceededError = imtProto.MaxResultsExceededError;
  global.MaxFileSizeExceededError = imtProto.MaxFileSizeExceededError;
  global.IncompleteDataError = imtProto.IncompleteDataError;
  global.DuplicateDataError = imtProto.DuplicateDataError;
  global.ModuleTimeoutError = imtProto.ModuleTimeoutError;
  global.ScenarioTimeoutError = imtProto.ScenarioTimeoutError;
  global.OperationsLimitExceededError = imtProto.OperationsLimitExceededError;
  global.DataSizeLimitExceededError = imtProto.DataSizeLimitExceededError;
  global.ExecutionInterruptedError = imtProto.ExecutionInterruptedError;
  global.IMTRouter = imtProto.IMTRouter;
  global.IMTListener = imtProto.IMTListener;
  global.IMTAccount = imtProto.IMTAccount;
  global.IMTOAuthAccount = imtProto.IMTOAuthAccount;
  global.IMTTrigger = imtProto.IMTTrigger;
  global.IMTGatewayTrigger = imtProto.IMTGatewayTrigger;
  global.IMTPauser = imtProto.IMTPauser;
  global.IMTBase = imtProto.IMTBase;
  global.IMTRPC = imtProto.IMTRPC;
  global.IMTFeeder = imtProto.IMTFeeder;
  global.IMTTransformer = imtProto.IMTTransformer;
}
