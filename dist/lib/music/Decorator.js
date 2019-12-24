"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookDecorator = Symbol("HookDecorator");
function getAllListeners(target) {
    if (target.constructor == null)
        return [];
    const methods = target.constructor[exports.HookDecorator];
    if (!Array.isArray(methods))
        return [];
    return methods;
}
exports.getAllListeners = getAllListeners;
function listen(event) {
    return function (target, propertyKey, descriptor) {
        if (target.prototype !== undefined)
            throw new Error(`"${target.name}#${String(propertyKey)}": Subscribe can only be applied to non-static methods`);
        if (target.constructor[exports.HookDecorator] == null)
            Object.defineProperty(target.constructor, exports.HookDecorator, {
                configurable: false,
                enumerable: false,
                writable: false,
                value: []
            });
        target.constructor[exports.HookDecorator].push({
            event,
            listener: descriptor.value,
        });
    };
}
exports.listen = listen;
