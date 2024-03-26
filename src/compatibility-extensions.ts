// NOTE(m.skvely): There are a lot of crimes here, we have to disable many rules to make this work
/* eslint-disable @typescript-eslint/ban-types,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call */

type AnyConstructor = {
  new (...args: any[]): any;
};

interface Function {
  /**
   * @deprecated
   */
  property(prop: PropertyKey, desc: PropertyDescriptor): void;

  /**
   * @deprecated
   */
  inherits<T>(parent: T): Function;

  /**
   * @deprecated
   */
  __super__?: Function;
}

Object.defineProperty(Function.prototype, 'property', {
  writable: true,
  configurable: true,
  value(this: Function, prop: PropertyKey, descriptor: PropertyDescriptor) {
    Object.defineProperty(this.prototype, prop, descriptor);
  },
});

Object.defineProperty(Function.prototype, 'inherits', {
  writable: true,
  configurable: true,
  value<T extends AnyConstructor, P extends AnyConstructor>(this: T, parent: P) {
    const child = this as unknown as P & T;

    for (const key in parent) {
      if (Object.prototype.hasOwnProperty.call(parent, key)) {
        child[key] = parent[key] as any;
      }
    }

    function Constructor(this: typeof Constructor) {
      this.constructor = child;
    }

    Constructor.prototype = parent.prototype;
    child.prototype = new (Constructor as any)();
    child.__super__ = parent.prototype;
    return child;
  },
});
