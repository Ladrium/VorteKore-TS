"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Decorator_1 = require("./Decorator");
class Hook {
    constructor(emitter) {
        Object.defineProperty(this, "emitter", { value: emitter });
        this._listen();
    }
    register(fn, event) {
        if (this.emitter.listenerCount(event))
            return;
        Decorator_1.listen(event)(this, fn.name, { value: fn });
        this.emitter.addListener(event, fn.bind(this));
    }
    _listen() {
        const methods = Decorator_1.getAllListeners(this);
        for (const method of methods)
            if (!this.emitter.listenerCount(method.event))
                this.emitter.addListener(method.event, method.listener.bind(this));
    }
}
exports.Hook = Hook;
