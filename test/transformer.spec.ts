import * as assert from 'assert';
import { IMTBase, ModuleType } from '../src/base';
import { IMTTransformer } from '../src/transformer';
import { IMTAggregator } from '../src/aggregator';
import { IMTFeeder } from '../src/feeder';
import { run } from './helpers';

describe('IMTTransformer', () => {
  it('should have TRANSFORMER type and extend IMTBase', () => {
    const transformer = new IMTTransformer();
    assert.ok(transformer instanceof IMTBase);
    assert.strictEqual(transformer.type, ModuleType.TRANSFORMER);
  });

  it('transform should throw when not overridden', () => {
    assert.throws(() => new IMTTransformer().transform({}, () => undefined), /transform/);
  });
});

describe('IMTAggregator', () => {
  it('should have AGGREGATOR type and extend IMTTransformer', () => {
    const aggregator = new IMTAggregator();
    assert.ok(aggregator instanceof IMTTransformer);
    assert.strictEqual(aggregator.type, ModuleType.AGGREGATOR);
  });
});

describe('IMTFeeder', () => {
  it('should have FEEDER type and extend IMTTransformer', () => {
    const feeder = new IMTFeeder();
    assert.ok(feeder instanceof IMTTransformer);
    assert.strictEqual(feeder.type, ModuleType.FEEDER);
  });

  it('transform should pass through an array', async () => {
    const result = await run<number[]>((done) => new IMTFeeder().transform({ array: [1, 2, 3] }, done));
    assert.deepStrictEqual(result, [1, 2, 3]);
  });

  it('transform should wrap a non-array value into an array', async () => {
    const result = await run<string[]>((done) => new IMTFeeder().transform({ array: 'single' }, done));
    assert.deepStrictEqual(result, ['single']);
  });

  it('transform should not throw without a callback', () => {
    assert.doesNotThrow(() => new IMTFeeder().transform({ array: [1] }, undefined as never));
  });
});
