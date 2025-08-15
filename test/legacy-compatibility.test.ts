import '../src/global';
import * as publicApi from '../src/index';

describe('Legacy Compatibility', () => {
  const EXTENDABLE_CLASSES = [
    IMTAggregator,
    IMTAction,
    IMTGatewayAction,
    IMTGatewayResponder,
    IMTHook,
    IMTConverger,
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
    IMTReturner,
    IMTStarter,
    IMTAgent,
  ];

  it('exports global variables', () => {
    expect(global.IMT_PROTO_LOADED).toBe(true);

    expect(global.requireCommon).toBeDefined();
    expect(typeof global.requireCommon).toBe('function');

    expect(global.IMTAggregator).toBeDefined();
    expect(global.IMTAction).toBeDefined();
    expect(global.IMTGatewayAction).toBeDefined();
    expect(global.IMTGatewayResponder).toBeDefined();
    expect(global.Warning).toBeDefined();
    expect(global.IMTHook).toBeDefined();
    expect(global.IMTConverger).toBeDefined();
    expect(global.UnknownError).toBeDefined();
    expect(global.RuntimeError).toBeDefined();
    expect(global.DataError).toBeDefined();
    expect(global.InconsistencyError).toBeDefined();
    expect(global.RateLimitError).toBeDefined();
    expect(global.OutOfSpaceError).toBeDefined();
    expect(global.ConnectionError).toBeDefined();
    expect(global.InvalidConfigurationError).toBeDefined();
    expect(global.InvalidAccessTokenError).toBeDefined();
    expect(global.UnexpectedError).toBeDefined();
    expect(global.MaxResultsExceededError).toBeDefined();
    expect(global.MaxFileSizeExceededError).toBeDefined();
    expect(global.IncompleteDataError).toBeDefined();
    expect(global.DuplicateDataError).toBeDefined();
    expect(global.ModuleTimeoutError).toBeDefined();
    expect(global.ScenarioTimeoutError).toBeDefined();
    expect(global.OperationsLimitExceededError).toBeDefined();
    expect(global.DataSizeLimitExceededError).toBeDefined();
    expect(global.ExecutionInterruptedError).toBeDefined();
    expect(global.IMTRouter).toBeDefined();
    expect(global.IMTListener).toBeDefined();
    expect(global.IMTAccount).toBeDefined();
    expect(global.IMTOAuthAccount).toBeDefined();
    expect(global.IMTTrigger).toBeDefined();
    expect(global.IMTGatewayTrigger).toBeDefined();
    expect(global.IMTPauser).toBeDefined();
    expect(global.IMTBase).toBeDefined();
    expect(global.IMTRPC).toBeDefined();
    expect(global.IMTFeeder).toBeDefined();
    expect(global.IMTTransformer).toBeDefined();
    expect(global.IMTHITL).toBeDefined();
    expect(global.IMTReturner).toBeDefined();
    expect(global.IMTStarter).toBeDefined();
    expect(global.IMTAgent).toBeDefined();
  });

  it('should have same values for globals and for public API', () => {
    expect(global.IMTAggregator === publicApi.IMTAggregator).toBe(true);
    expect(global.IMTAction === publicApi.IMTAction).toBe(true);
    expect(global.IMTGatewayAction === publicApi.IMTGatewayAction).toBe(true);
    expect(global.IMTGatewayResponder === publicApi.IMTGatewayResponder).toBe(true);
    expect(global.Warning === publicApi.Warning).toBe(true);
    expect(global.IMTHook === publicApi.IMTHook).toBe(true);
    expect(global.IMTConverger === publicApi.IMTConverger).toBe(true);
    expect(global.UnknownError === publicApi.UnknownError).toBe(true);
    expect(global.RuntimeError === publicApi.RuntimeError).toBe(true);
    expect(global.DataError === publicApi.DataError).toBe(true);
    expect(global.InconsistencyError === publicApi.InconsistencyError).toBe(true);
    expect(global.RateLimitError === publicApi.RateLimitError).toBe(true);
    expect(global.OutOfSpaceError === publicApi.OutOfSpaceError).toBe(true);
    expect(global.ConnectionError === publicApi.ConnectionError).toBe(true);
    expect(global.InvalidConfigurationError === publicApi.InvalidConfigurationError).toBe(true);
    expect(global.InvalidAccessTokenError === publicApi.InvalidAccessTokenError).toBe(true);
    expect(global.UnexpectedError === publicApi.UnexpectedError).toBe(true);
    expect(global.MaxResultsExceededError === publicApi.MaxResultsExceededError).toBe(true);
    expect(global.MaxFileSizeExceededError === publicApi.MaxFileSizeExceededError).toBe(true);
    expect(global.IncompleteDataError === publicApi.IncompleteDataError).toBe(true);
    expect(global.DuplicateDataError === publicApi.DuplicateDataError).toBe(true);
    expect(global.ModuleTimeoutError === publicApi.ModuleTimeoutError).toBe(true);
    expect(global.ScenarioTimeoutError === publicApi.ScenarioTimeoutError).toBe(true);
    expect(global.OperationsLimitExceededError === publicApi.OperationsLimitExceededError).toBe(true);
    expect(global.DataSizeLimitExceededError === publicApi.DataSizeLimitExceededError).toBe(true);
    expect(global.ExecutionInterruptedError === publicApi.ExecutionInterruptedError).toBe(true);
    expect(global.IMTRouter === publicApi.IMTRouter).toBe(true);
    expect(global.IMTListener === publicApi.IMTListener).toBe(true);
    expect(global.IMTAccount === publicApi.IMTAccount).toBe(true);
    expect(global.IMTOAuthAccount === publicApi.IMTOAuthAccount).toBe(true);
    expect(global.IMTTrigger === publicApi.IMTTrigger).toBe(true);
    expect(global.IMTGatewayTrigger === publicApi.IMTGatewayTrigger).toBe(true);
    expect(global.IMTPauser === publicApi.IMTPauser).toBe(true);
    expect(global.IMTBase === publicApi.IMTBase).toBe(true);
    expect(global.IMTRPC === publicApi.IMTRPC).toBe(true);
    expect(global.IMTFeeder === publicApi.IMTFeeder).toBe(true);
    expect(global.IMTTransformer === publicApi.IMTTransformer).toBe(true);
    expect(global.IMTHITL === publicApi.IMTHITL).toBe(true);
    expect(global.IMTReturner === publicApi.IMTReturner).toBe(true);
    expect(global.IMTStarter === publicApi.IMTStarter).toBe(true);
    expect(global.IMTAgent === publicApi.IMTAgent).toBe(true);
  });

  it('should be compatible with CoffeeScript classes', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const hasProp = {}.hasOwnProperty;
    const extend = function (child: any, parent: any): any {
      for (const key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }

      function Constructor(this: any) {
        this.constructor = child;
      }

      Constructor.prototype = parent.prototype;
      child.prototype = new (Constructor as any)();
      child.__super__ = parent.prototype;
      return child;
    };

    for (const extendableClass of EXTENDABLE_CLASSES) {
      const CoffeeClass = (function (superClass) {
        extend(CoffeeClass, superClass);

        function CoffeeClass(this: any) {
          // eslint-disable-next-line prefer-rest-params,@typescript-eslint/no-unsafe-return
          return CoffeeClass.__super__!.constructor.apply(this, arguments);
        }

        return CoffeeClass;
      })(extendableClass);

      const instance = new (CoffeeClass as any)();
      expect(instance).toBeInstanceOf(CoffeeClass);
      expect(instance).toBeInstanceOf(extendableClass);
    }
  });

  it('should allow extending class using .inherits', () => {
    for (const extendableClass of EXTENDABLE_CLASSES) {
      const ChildClass = (function factory(supr) {
        ChildClass.inherits(supr);

        function ChildClass(this: any) {
          ChildClass.__super__!.constructor.call(this);
        }

        return ChildClass;
      })(extendableClass);

      const instance = new (ChildClass as any)();
      expect(instance).toBeInstanceOf(ChildClass);
      expect(instance).toBeInstanceOf(extendableClass);
    }
  });

  it('should allow extending class using ES6 extends', () => {
    for (const extendableClass of EXTENDABLE_CLASSES) {
      class ChildClass extends extendableClass {}

      const instance = new ChildClass();
      expect(instance).toBeInstanceOf(ChildClass);
      expect(instance).toBeInstanceOf(extendableClass);
    }
  });

  it('should have correct names on error classes', () => {
    expect(new UnknownError('').name).toBe('UnknownError');
    expect(new RuntimeError('').name).toBe('RuntimeError');
    expect(new DataError('').name).toBe('DataError');
    expect(new InconsistencyError('').name).toBe('InconsistencyError');
    expect(new RateLimitError('', 1).name).toBe('RateLimitError');
    expect(new OutOfSpaceError('').name).toBe('OutOfSpaceError');
    expect(new ConnectionError('').name).toBe('ConnectionError');
    expect(new InvalidConfigurationError('').name).toBe('InvalidConfigurationError');
    expect(new InvalidAccessTokenError('').name).toBe('InvalidAccessTokenError');
    expect(new UnexpectedError('').name).toBe('UnexpectedError');
    expect(new MaxResultsExceededError('').name).toBe('MaxResultsExceededError');
    expect(new MaxFileSizeExceededError('').name).toBe('MaxFileSizeExceededError');
    expect(new IncompleteDataError('', 1).name).toBe('IncompleteDataError');
    expect(new DuplicateDataError('').name).toBe('DuplicateDataError');
    expect(new ModuleTimeoutError('').name).toBe('ModuleTimeoutError');
    expect(new ScenarioTimeoutError('').name).toBe('ScenarioTimeoutError');
    expect(new OperationsLimitExceededError('').name).toBe('OperationsLimitExceededError');
    expect(new DataSizeLimitExceededError('').name).toBe('DataSizeLimitExceededError');
    expect(new ExecutionInterruptedError('').name).toBe('ExecutionInterruptedError');
  });

  it('should have correct name on the constructor', () => {
    expect(new UnknownError('').constructor.name).toBe('UnknownError');
    expect(new RuntimeError('').constructor.name).toBe('RuntimeError');
    expect(new DataError('').constructor.name).toBe('DataError');
    expect(new InconsistencyError('').constructor.name).toBe('InconsistencyError');
    expect(new RateLimitError('', 1).constructor.name).toBe('RateLimitError');
    expect(new OutOfSpaceError('').constructor.name).toBe('OutOfSpaceError');
    expect(new ConnectionError('').constructor.name).toBe('ConnectionError');
    expect(new InvalidConfigurationError('').constructor.name).toBe('InvalidConfigurationError');
    expect(new InvalidAccessTokenError('').constructor.name).toBe('InvalidAccessTokenError');
    expect(new UnexpectedError('').constructor.name).toBe('UnexpectedError');
    expect(new MaxResultsExceededError('').constructor.name).toBe('MaxResultsExceededError');
    expect(new MaxFileSizeExceededError('').constructor.name).toBe('MaxFileSizeExceededError');
    expect(new IncompleteDataError('', 1).constructor.name).toBe('IncompleteDataError');
    expect(new DuplicateDataError('').constructor.name).toBe('DuplicateDataError');
    expect(new ModuleTimeoutError('').constructor.name).toBe('ModuleTimeoutError');
    expect(new ScenarioTimeoutError('').constructor.name).toBe('ScenarioTimeoutError');
    expect(new OperationsLimitExceededError('').constructor.name).toBe('OperationsLimitExceededError');
    expect(new DataSizeLimitExceededError('').constructor.name).toBe('DataSizeLimitExceededError');
    expect(new ExecutionInterruptedError('').constructor.name).toBe('ExecutionInterruptedError');
  });

  it('should have working instanceof operator', () => {
    expect(new UnknownError('') instanceof UnknownError).toBe(true);
    expect(new RuntimeError('') instanceof RuntimeError).toBe(true);
    expect(new DataError('') instanceof DataError).toBe(true);
    expect(new InconsistencyError('') instanceof InconsistencyError).toBe(true);
    expect(new RateLimitError('', 1) instanceof RateLimitError).toBe(true);
    expect(new OutOfSpaceError('') instanceof OutOfSpaceError).toBe(true);
    expect(new ConnectionError('') instanceof ConnectionError).toBe(true);
    expect(new InvalidConfigurationError('') instanceof InvalidConfigurationError).toBe(true);
    expect(new InvalidAccessTokenError('') instanceof InvalidAccessTokenError).toBe(true);
    expect(new UnexpectedError('') instanceof UnexpectedError).toBe(true);
    expect(new MaxResultsExceededError('') instanceof MaxResultsExceededError).toBe(true);
    expect(new MaxFileSizeExceededError('') instanceof MaxFileSizeExceededError).toBe(true);
    expect(new IncompleteDataError('', 1) instanceof IncompleteDataError).toBe(true);
    expect(new DuplicateDataError('') instanceof DuplicateDataError).toBe(true);
    expect(new ModuleTimeoutError('') instanceof ModuleTimeoutError).toBe(true);
    expect(new ScenarioTimeoutError('') instanceof ScenarioTimeoutError).toBe(true);
    expect(new OperationsLimitExceededError('') instanceof OperationsLimitExceededError).toBe(true);
    expect(new DataSizeLimitExceededError('') instanceof DataSizeLimitExceededError).toBe(true);
    expect(new ExecutionInterruptedError('') instanceof ExecutionInterruptedError).toBe(true);
  });
});
