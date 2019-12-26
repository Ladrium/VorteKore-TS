import { VorteClient } from "../VorteClient";
import DBLAPI = require("dblapi.js");
import { Laffey, Storages } from "laffey";
import Logger from "@ayana/logger";

export class BLHandler {
	public logger: Logger = Logger.get(BLHandler);
	public laffey: Laffey = new Laffey(3000, "/dboats", {
		storage: new Storages.MemoryStorage(), 
		auth: process.env.DBOATS_AUTH!
	});

	public dbl: DBLAPI = new DBLAPI(process.env.DBL_TOKEN!, {
		webhookAuth: process.env.DBL_WEBHOOK_AUTH!,
		statsInterval: 900000,
		webhookPath: process.env.DBL_WEBHOOK_PATH!,
		webhookPort: 3001
	});

	public constructor(
		public bot: VorteClient
	) {}
}