"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const logger_1 = __importDefault(require("@ayana/logger"));
class Event extends Module_1.VorteModule {
    constructor(name, { category, disabled, type = "on", emitter = "client", event, }) {
        super(name, { category, disabled });
        this.logger = Event.logger;
        this.type = type;
        this.emitter = emitter;
        this.event = event;
    }
}
exports.Event = Event;
Event.logger = logger_1.default.get(Event);
