export const HookDecorator = Symbol("HookDecorator");

export interface HookMethod {
  event: string;
  listener: Function;
}

/**
 * Gets all the "listeners" for the given hook.
 * @param target The desired hook.
 */
export function getAllListeners(target: any): HookMethod[] {
  if (target.constructor == null) return [];
  const methods = target.constructor[HookDecorator];
  if (!Array.isArray(methods)) return [];
  return methods;
}

/**
 * Adds a listener entry for Hook#_listen.
 * @param event The event to listen for.
 */
export function listen(event: string): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    if (target.prototype !== undefined) throw new Error(`"${target.name}#${String(propertyKey)}": Subscribe can only be applied to non-static methods`);

    if (target.constructor[HookDecorator] == null)
      Object.defineProperty(target.constructor, HookDecorator, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: []
      });

    target.constructor[HookDecorator].push({
      event,
      listener: descriptor.value,
    });
  }
}