"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
class Event extends Module_1.VorteModule {
    constructor(name, { category, disabled, type = "on", emitter = "client", event, }) {
        super(name, { category, disabled });
        this.type = type;
        this.emitter = emitter;
        this.event = event;
    }
}
exports.Event = Event;
