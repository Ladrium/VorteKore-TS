import Logger from "@ayana/logger";
import { Dictionary } from "express-serve-static-core";
import { Connection, createConnection, getMongoRepository, MongoRepository } from "typeorm";
import { ClientPlugin } from "../lib/Plugin";
import { Config } from "../util/Config";
import { CaseEntity } from "../models/Case";
import { GuildEntity } from "../models/Guild";
import { ProfileEntity } from "../models/Profile";

export default class DatabasePlugin extends ClientPlugin {

	public name = "database";
	public logger: Logger = Logger.get(DatabasePlugin)
	public connection?: Connection;
	public ready: boolean = false;

	public cases?: MongoRepository<CaseEntity>
	public guilds?: MongoRepository<GuildEntity>;
	public profiles?: MongoRepository<ProfileEntity>;

	public async onReady() {
		createConnection({
			url: Config.get("uri")!,
			entities: [GuildEntity, ProfileEntity, CaseEntity],
			type: "mongodb",
			extra: {
				useUnifiedTopology: true
			}
		}).then(async (connection) => {
			this.connection = connection;

			this.cases = getMongoRepository(CaseEntity);
			this.guilds = getMongoRepository(GuildEntity);
			this.profiles = getMongoRepository(ProfileEntity);

			this.ready = true;
			this.logger.info("Connected Successfully.");
		}, (reason) => this.logger.error(`Couldn't connect to the database: ${reason}`));
	}

	public async newCase(guildId: string, data: Dictionary<any>): Promise<CaseEntity> {
		const guild = await this.getGuild(guildId);
		guild.cases = Number(guild.cases) + 1;
		const _case = new CaseEntity(guild.cases, guildId);

		Object.keys(data).forEach(key => (_case as any)[key] = data[key]);

		await guild.save();
		await _case.save();
		return _case;
	}

	public async getGuild(guildId: string): Promise<GuildEntity> {
		if (!this.guilds) throw new Error("Database isn't connected.")

		const guild = await this.guilds.findOne({ guildId });
		if (guild) return guild;

		return new GuildEntity(guildId);
	}

	public async getProfile(userId: string, guildId: string): Promise<ProfileEntity> {
		if (!this.profiles) throw new Error("Database isn't connected.")

		const profile = await this.profiles.findOne({ userId, guildId });
		if (profile) return profile;

		return new ProfileEntity(userId, guildId);
	}
}