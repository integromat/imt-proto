import * as assert from 'assert';
import { IMTBase, ModuleType } from '../src/base';
import { IMTListener } from '../src/listener';
import { IMTPauser } from '../src/pauser';
import { IMTReturner } from '../src/returner';
import { IMTHITL } from '../src/hitl';
import { IMTStarter } from '../src/starter';
import { IMTRouter } from '../src/router';
import { IMTConverger } from '../src/converger';
import { IMTConditional } from '../src/conditional';
import { IMTGatewayTrigger } from '../src/trigger';
import { IMTGatewayAction, IMTGatewayResponder, IMTAction } from '../src/action';
import { IMTTrigger } from '../src/trigger';

describe('marker module classes', () => {
  it('should expose the correct module type', () => {
    assert.strictEqual(new IMTRouter().type, ModuleType.ROUTER);
    assert.strictEqual(new IMTConverger().type, ModuleType.CONVERGER);
    assert.strictEqual(new IMTConditional().type, ModuleType.CONDITIONAL);
    assert.strictEqual(new IMTListener().type, ModuleType.LISTENER);
    assert.strictEqual(new IMTPauser().type, ModuleType.PAUSER);
    assert.strictEqual(new IMTReturner().type, ModuleType.RETURNER);
    assert.strictEqual(new IMTHITL().type, ModuleType.HITL);
    assert.strictEqual(new IMTStarter().type, ModuleType.STARTER);
  });

  it('all markers should extend IMTBase', () => {
    for (const instance of [
      new IMTRouter(),
      new IMTConverger(),
      new IMTConditional(),
      new IMTListener(),
      new IMTPauser(),
      new IMTReturner(),
      new IMTHITL(),
      new IMTStarter(),
    ]) {
      assert.ok(instance instanceof IMTBase);
    }
  });
});

describe('gateway variants', () => {
  it('IMTGatewayTrigger should extend IMTTrigger', () => {
    const gateway = new IMTGatewayTrigger();
    assert.ok(gateway instanceof IMTTrigger);
    assert.strictEqual(gateway.type, ModuleType.TRIGGER);
  });

  it('IMTGatewayAction and IMTGatewayResponder should extend IMTAction', () => {
    assert.ok(new IMTGatewayAction() instanceof IMTAction);
    assert.ok(new IMTGatewayResponder() instanceof IMTAction);
    assert.strictEqual(new IMTGatewayAction().type, ModuleType.ACTION);
    assert.strictEqual(new IMTGatewayResponder().type, ModuleType.ACTION);
  });
});

describe('abstract methods throw when not overridden', () => {
  it('IMTListener.start / stop', () => {
    assert.throws(() => new IMTListener().start(() => undefined), /start/);
    assert.throws(() => new IMTListener().stop(() => undefined), /stop/);
  });

  it('IMTPauser.pause', () => {
    assert.throws(() => new IMTPauser().pause({}, () => undefined), /pause/);
  });

  it('IMTReturner.returnData', () => {
    assert.throws(() => new IMTReturner().returnData({}, () => undefined), /returnData/);
  });

  it('IMTHITL.execute', () => {
    assert.throws(() => new IMTHITL().execute({}, () => undefined), /execute/);
  });

  it('IMTStarter.start', () => {
    assert.throws(() => new IMTStarter().start(() => undefined), /start/);
  });

  it('IMTAction.write', () => {
    assert.throws(() => new IMTAction().write({}, () => undefined), /write/);
  });

  it('IMTTrigger.read / fetch', () => {
    assert.throws(() => new IMTTrigger().read(() => undefined), /read/);
    assert.throws(() => new IMTTrigger().fetch(1, () => undefined), /fetch/);
  });
});
