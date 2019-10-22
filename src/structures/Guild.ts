import { Guild as guild } from "discord.js";
import Guild from "../models/guild";

let thisGuild: any;
export class VorteGuild {
  constructor(guild: guild) {
    this._load(guild);
  }
  async _load(g: guild) {
    thisGuild = await Guild.findOne({ guildID: g.id }) || new Guild({
      guildID: g.id,
      case: 0,
      prefix: "!",
      autoRoles: [],
      staffRoles: [],
      welcome: {},
      leave: {},
      logs: {}
    });
    return this;
  }
  increaseCase(): this {
    thisGuild.case++;
    thisGuild.save().catch(console.error);
    return this;
  }
  setPrefix(prefix: string): this {
    thisGuild.prefix = prefix;
    thisGuild.save().catch(console.error);
    return this;
  }
  addAutoRole(role: string): this | void {
    thisGuild.autoRoles.push(role);
    thisGuild.save().catch(console.error);
    return this;
  }
  removeAutoRole(role: string): this {
    const index = thisGuild.autoRoles.findIndex((x: string) => x === role);
    if (!index) return this;
    thisGuild.autoRoles.splice(index, 1);
    thisGuild.save().catch(console.error);
    return this;
  }
};