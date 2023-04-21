const {
	IMTAggregator,
	IMTAction,
	IMTGatewayAction,
	IMTGatewayResponder,
	Warning,
	IMTHook,
	IMTConverger,
	UnknownError,
	RuntimeError,
	DataError,
	InconsistencyError,
	RateLimitError,
	OutOfSpaceError,
	ConnectionError,
	InvalidConfigurationError,
	InvalidAccessTokenError,
	UnexpectedError,
	MaxResultsExceededError,
	MaxFileSizeExceededError,
	IncompleteDataError,
	DuplicateDataError,
	ModuleTimeoutError,
	ScenarioTimeoutError,
	OperationsLimitExceededError,
	DataSizeLimitExceededError,
	ExecutionInterruptedError,
	IMTRouter,
	IMTListener,
	IMTAccount,
	IMTOAuthAccount,
	IMTTrigger,
	IMTGatewayTrigger,
	IMTPauser,
	IMTBase,
	IMTRPC,
	IMTFeeder,
	IMTTransformer,
} = require('.');

const g = global;

if (!g.IMT_PROTO_LOADED) {
	g.IMT_PROTO_LOADED = true;

	/**
	 * Require module from common collection of preloaded modules. This method is set later by Integration's core.
	 *
	 * @param {String} name Module nane.
	 * @returns {*}
	 */
	if (!g.requireCommon) g.requireCommon = () => null;

	g.IMTAggregator = IMTAggregator;
	g.IMTAction = IMTAction;
	g.IMTGatewayAction = IMTGatewayAction;
	g.IMTGatewayResponder = IMTGatewayResponder;
	g.Warning = Warning;
	g.IMTHook = IMTHook;
	g.IMTConverger = IMTConverger;
	g.UnknownError = UnknownError;
	g.RuntimeError = RuntimeError;
	g.DataError = DataError;
	g.InconsistencyError = InconsistencyError;
	g.RateLimitError = RateLimitError;
	g.OutOfSpaceError = OutOfSpaceError;
	g.ConnectionError = ConnectionError;
	g.InvalidConfigurationError = InvalidConfigurationError;
	g.InvalidAccessTokenError = InvalidAccessTokenError;
	g.UnexpectedError = UnexpectedError;
	g.MaxResultsExceededError = MaxResultsExceededError;
	g.MaxFileSizeExceededError = MaxFileSizeExceededError;
	g.IncompleteDataError = IncompleteDataError;
	g.DuplicateDataError = DuplicateDataError;
	g.ModuleTimeoutError = ModuleTimeoutError;
	g.ScenarioTimeoutError = ScenarioTimeoutError;
	g.OperationsLimitExceededError = OperationsLimitExceededError;
	g.DataSizeLimitExceededError = DataSizeLimitExceededError;
	g.ExecutionInterruptedError = ExecutionInterruptedError;
	g.IMTRouter = IMTRouter;
	g.IMTListener = IMTListener;
	g.IMTAccount = IMTAccount;
	g.IMTOAuthAccount = IMTOAuthAccount;
	g.IMTTrigger = IMTTrigger;
	g.IMTGatewayTrigger = IMTGatewayTrigger;
	g.IMTPauser = IMTPauser;
	g.IMTBase = IMTBase;
	g.IMTRPC = IMTRPC;
	g.IMTFeeder = IMTFeeder;
	g.IMTTransformer = IMTTransformer;
}
