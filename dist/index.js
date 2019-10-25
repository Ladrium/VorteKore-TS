"use strict";
let __importDefault = (this && this.__importDefault) || function(mod) {
	return (mod && mod.__esModule) ? mod : { "default": mod };
};
let __importStar = (this && this.__importStar) || function(mod) {
	if (mod && mod.__esModule) return mod;
	let result = {};
	if (mod != null) for (let k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	result["default"] = mod;
	return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Handler_1 = require("./structures/Handler");
const VorteClient_1 = require("./structures/VorteClient");
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.config({
	path: `${__dirname}/../.env`,
});
mongoose_1.default.connect(process.env.URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}, (err) => {
	if (err)
		{console.log(err);}
});
const bot = new VorteClient_1.VorteClient();
bot.handler = new Handler_1.Handler(bot);
bot.handler.loadCommands();
bot.handler.loadEvents();
bot.login(con.default.token);
