import {
  IMTAction,
  IMTAggregator,
  IMTConverger,
  IMTFeeder,
  IMTRouter,
  IMTTransformer,
  IMTTrigger,
  IMTReturner,
  ModuleType,
  IMTStarter,
} from '../src';

describe('ModuleType', () => {
  it('should be discriminated union', () => {
    const allModuleTypes = [
      new IMTAction(),
      new IMTAggregator(),
      new IMTConverger(),
      new IMTFeeder(),
      new IMTRouter(),
      new IMTTransformer(),
      new IMTTrigger(),
      new IMTReturner(),
      new IMTStarter(),
    ];

    for (const module of allModuleTypes) {
      // NOTE(m.skvely): This code will trigger a TypeScript error if the type is not correctly discriminated
      switch (module.type) {
        case ModuleType.TRIGGER:
          expect(module).toBeInstanceOf(IMTTrigger);
          break;
        case ModuleType.TRANSFORMER:
          expect(module).toBeInstanceOf(IMTTransformer);
          break;
        case ModuleType.ROUTER:
          expect(module).toBeInstanceOf(IMTRouter);
          break;
        case ModuleType.ACTION:
          expect(module).toBeInstanceOf(IMTAction);
          break;
        case ModuleType.FEEDER:
          expect(module).toBeInstanceOf(IMTFeeder);
          break;
        case ModuleType.AGGREGATOR:
          expect(module).toBeInstanceOf(IMTAggregator);
          break;
        case ModuleType.CONVERGER:
          expect(module).toBeInstanceOf(IMTConverger);
          break;
        case ModuleType.RETURNER:
          expect(module).toBeInstanceOf(IMTReturner);
          break;
        case ModuleType.STARTER:
          expect(module).toBeInstanceOf(IMTStarter);
          break;
        default:
          throw new Error('Unexpected module type');
      }
    }
  });
});
