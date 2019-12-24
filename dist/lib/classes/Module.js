"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VorteModule {
    constructor(name, { category = "general", disabled = false }) {
        this.name = name;
        this.category = category;
        this.disabled = disabled;
    }
    _onLoad(handler) {
        this.bot = handler.bot;
        this.handler = handler;
    }
}
exports.VorteModule = VorteModule;
