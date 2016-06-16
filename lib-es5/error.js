'use strict'

/**
 * For API docummentation see ES6 version.
 */

global.UnknownError = function(supr) {
	UnknownError.inherits(supr);

	function UnknownError(err) {
		UnknownError.__super__.constructor.call(this);

		if ('object' === typeof err) {
			for (var k in err) this[k] = err[k];
			this.message = err.message || "<no message>";
		} else if ('string' === typeof err) {
			this.message = err;
		}
		
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}

	UnknownError.prototype.toJSON = function toJSON(bundle) {
		var json = UnknownError.__super__.toJSON.call(this, bundle);
		for (var k in this) json[k] = this[k];
		return json;
	}

	return UnknownError;
}(Error);

global.RuntimeError = function(supr) {
	RuntimeError.inherits(supr);

	function RuntimeError(message) {
		RuntimeError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return RuntimeError;
}(Error);

global.DataError = function(supr) {
	DataError.inherits(supr);

	function DataError(message) {
		DataError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return DataError;
}(Error);

global.InconsistencyError = function(supr) {
	InconsistencyError.inherits(supr);

	function InconsistencyError(message) {
		InconsistencyError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return InconsistencyError;
}(Error);

global.RateLimitError = function(supr) {
	RateLimitError.inherits(supr);

	function RateLimitError(message, delay) {
		RateLimitError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;
		this.delay = delay;

		Error.captureStackTrace(this, this.constructor);
	}

	return RateLimitError;
}(Error);

global.OutOfSpaceError = function(supr) {
	OutOfSpaceError.inherits(supr);

	function OutOfSpaceError(message) {
		OutOfSpaceError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return OutOfSpaceError;
}(Error);

global.ConnectionError = function(supr) {
	ConnectionError.inherits(supr);

	function ConnectionError(message) {
		ConnectionError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return ConnectionError;
}(Error);

global.InvalidConfigurationError = function(supr) {
	InvalidConfigurationError.inherits(supr);

	function InvalidConfigurationError(message) {
		InvalidConfigurationError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return InvalidConfigurationError;
}(Error);

global.InvalidAccessTokenError = function(supr) {
	InvalidAccessTokenError.inherits(supr);

	function InvalidAccessTokenError(message) {
		InvalidAccessTokenError.__super__.constructor.call(this, message);
	}

	return InvalidAccessTokenError;
}(InvalidConfigurationError);

global.UnexpectedError = function(supr) {
	UnexpectedError.inherits(supr);

	function UnexpectedError(message) {
		UnexpectedError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return UnexpectedError;
}(Error);

global.MaxResultsExceededError = function(supr) {
	MaxResultsExceededError.inherits(supr);

	function MaxResultsExceededError(message) {
		MaxResultsExceededError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return MaxResultsExceededError;
}(Error);

global.MaxFileSizeExceededError = function(supr) {
	MaxFileSizeExceededError.inherits(supr);

	function MaxFileSizeExceededError(message) {
		MaxFileSizeExceededError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return MaxFileSizeExceededError;
}(Error);

global.IncompleteDataError = function(supr) {
	IncompleteDataError.inherits(supr);

	function IncompleteDataError(message, delay) {
		IncompleteDataError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;
		this.delay = delay;

		Error.captureStackTrace(this, this.constructor);
	}

	return IncompleteDataError;
}(Error);

global.DuplicateDataError = function(supr) {
	DuplicateDataError.inherits(supr);

	function DuplicateDataError(message) {
		DuplicateDataError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return DuplicateDataError;
}(Error);

global.ModuleTimeoutError = function(supr) {
	ModuleTimeoutError.inherits(supr);

	function ModuleTimeoutError(message) {
		ModuleTimeoutError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return ModuleTimeoutError;
}(Error);

global.ScenarioTimeoutError = function(supr) {
	ScenarioTimeoutError.inherits(supr);

	function ScenarioTimeoutError(message) {
		ScenarioTimeoutError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return ScenarioTimeoutError;
}(Error);

global.OperationsLimitExceededError = function(supr) {
	OperationsLimitExceededError.inherits(supr);

	function OperationsLimitExceededError(message) {
		OperationsLimitExceededError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return OperationsLimitExceededError;
}(Error);

global.DataSizeLimitExceededError = function(supr) {
	DataSizeLimitExceededError.inherits(supr);

	function DataSizeLimitExceededError(message) {
		DataSizeLimitExceededError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return DataSizeLimitExceededError;
}(Error);

global.ExecutionInterruptedError = function(supr) {
	ExecutionInterruptedError.inherits(supr);

	function ExecutionInterruptedError(message) {
		ExecutionInterruptedError.__super__.constructor.call(this);

		this.name = this.constructor.name;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}

	return ExecutionInterruptedError;
}(Error);

Object.defineProperty(Error.prototype, 'toJSON', {
	configurable: true,
	writable: true,
	value: function() {
		var json = {
			name: this.name,
			message: this.message,
			stack: this.stack
		};

		if (this.hash != null) json.hash = this.hash;
		if (this.bundle != null) json.bundle = this.bundle;
		if (Array.isArray(this.suberrors)) json.suberrors = this.suberrors.map(function(item) { return item.toJSON(); });
		if (this.external != null) json.external = this.external;

		return json;
	}
})
