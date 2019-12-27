"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importStar(require("@ayana/logger"));
const util_1 = require("@ayana/logger/build/util");
const fecha_1 = __importDefault(require("fecha"));
class VorteFormatter extends logger_1.DefaultFormatter {
    constructor() {
        super(...arguments);
        this.colored = new util_1.Color();
    }
    get timestamp() {
        return this.colored.dim(this.colored.gray(fecha_1.default.format(Date.now(), "hh:mm MM/DD/YYYY")));
    }
    formatMessage(meta, message) {
        const topic = this.colored.yellow(meta.extra.topic !== undefined ? `(${meta.extra.topic})` : `(VorteKore)`);
        const level = this.colored.get(logger_1.LogLevelColor[meta.level], meta.level.padEnd(6));
        const loc = `[${this.colored.magenta(`\u001b[1m${meta.origin.packageName}:`)}${this.colored.blue(`${meta.origin.packagePath}${meta.origin.name}`)}${meta.uniqueMarker
            ? `/${this.colored.gray(`${meta.uniqueMarker}`)}`
            : ""}\u001b[22m]`;
        return `${this.timestamp} ${topic} ${level}${loc}: ${message}`;
    }
}
exports.VorteFormatter = VorteFormatter;
logger_1.default.getDefaultTransport().setLevel(logger_1.LogLevel.TRACE);
logger_1.default.setFormatter(new VorteFormatter());
