"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@ayana/logger"));
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../lib/Plugin");
const Config_1 = require("../util/Config");
const Case_1 = require("../models/Case");
const Guild_1 = require("../models/Guild");
const Profile_1 = require("../models/Profile");
class DatabasePlugin extends Plugin_1.ClientPlugin {
    constructor() {
        super(...arguments);
        this.name = "database";
        this.logger = logger_1.default.get(DatabasePlugin);
        this.ready = false;
    }
    async onReady() {
        typeorm_1.createConnection({
            url: Config_1.Config.get("uri"),
            entities: [Guild_1.GuildEntity, Profile_1.ProfileEntity, Case_1.CaseEntity],
            type: "mongodb",
            extra: {
                useUnifiedTopology: true
            }
        }).then(async (connection) => {
            this.connection = connection;
            this.cases = typeorm_1.getMongoRepository(Case_1.CaseEntity);
            this.guilds = typeorm_1.getMongoRepository(Guild_1.GuildEntity);
            this.profiles = typeorm_1.getMongoRepository(Profile_1.ProfileEntity);
            this.ready = true;
            this.logger.info("Connected Successfully.");
        }, (reason) => this.logger.error(`Couldn't connect to the database: ${reason}`));
    }
    async newCase(guildId, data) {
        const guild = await this.getGuild(guildId);
        guild.cases = Number(guild.cases) + 1;
        const _case = new Case_1.CaseEntity(guild.cases, guildId);
        Object.keys(data).forEach(key => _case[key] = data[key]);
        await guild.save();
        await _case.save();
        return _case;
    }
    async getGuild(guildId) {
        if (!this.guilds)
            throw new Error("Database isn't connected.");
        const guild = await this.guilds.findOne({ guildId });
        if (guild)
            return guild;
        return new Guild_1.GuildEntity(guildId);
    }
    async getProfile(userId, guildId) {
        if (!this.profiles)
            throw new Error("Database isn't connected.");
        const profile = await this.profiles.findOne({ userId, guildId });
        if (profile)
            return profile;
        return new Profile_1.ProfileEntity(userId, guildId);
    }
}
exports.default = DatabasePlugin;
