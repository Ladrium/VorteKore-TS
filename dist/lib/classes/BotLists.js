"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DBLAPI = require("dblapi.js");
const laffey_1 = require("laffey");
const logger_1 = __importDefault(require("@ayana/logger"));
class BLHandler {
    constructor(bot) {
        this.bot = bot;
        this.logger = logger_1.default.get(BLHandler);
        this.laffey = new laffey_1.Laffey(3000, "/dboats", {
            storage: new laffey_1.Storages.MemoryStorage(),
            auth: process.env.DBOATS_AUTH
        });
        this.dbl = new DBLAPI(process.env.DBL_TOKEN, {
            webhookAuth: process.env.DBL_WEBHOOK_AUTH,
            statsInterval: 900000,
            webhookPath: process.env.DBL_WEBHOOK_PATH,
            webhookPort: 3001
        });
    }
    _init() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.BLHandler = BLHandler;
