"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SUBSCRIBED_EVENTS_SYMBOL = Symbol("SubscribedEvents");
class ClientPlugin {
    constructor(client) {
        this.client = client;
    }
    onLoad() { }
    ;
    onReady() { this._listen(); }
    ;
    get emitters() {
        return {
            client: this.client,
            andesite: this.client.andesite,
            handler: this.client.handler,
            process
        };
    }
    register(fn, event, { emitter = "client", type = "on" } = {}) {
        if (!this.emitters[emitter])
            return;
        if (this.emitters[emitter].listenerCount(event))
            return;
        Subscribe(event, { emitter, type })(this, fn.name, { value: fn });
        this.emitters[emitter][type](event, fn.bind(this));
    }
    _listen() {
        const methods = getAllListeners(this);
        for (const method of methods)
            if (!this.emitters[method.emitter].listenerCount(method.event))
                this.emitters[method.emitter][method.type](method.event, method.listener.bind(this));
    }
}
exports.ClientPlugin = ClientPlugin;
function getAllListeners(target) {
    if (target.constructor == null)
        return [];
    const methods = target.constructor[SUBSCRIBED_EVENTS_SYMBOL];
    if (!Array.isArray(methods))
        return [];
    return methods;
}
function Subscribe(event, { emitter = "client", type = "on" } = {}) {
    return function (target, propertyKey, descriptor) {
        if (target.prototype !== undefined)
            throw new Error(`"${target.name}#${String(propertyKey)}": Subscribe can only be applied to non-static methods`);
        if (target.constructor[SUBSCRIBED_EVENTS_SYMBOL] == null)
            Object.defineProperty(target.constructor, SUBSCRIBED_EVENTS_SYMBOL, {
                configurable: false,
                enumerable: false,
                writable: false,
                value: []
            });
        target.constructor[SUBSCRIBED_EVENTS_SYMBOL].push({
            event,
            listener: descriptor.value,
            emitter,
            type
        });
    };
}
exports.Subscribe = Subscribe;
