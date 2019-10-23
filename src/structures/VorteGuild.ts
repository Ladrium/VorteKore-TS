import { Guild as guild } from "discord.js";
import Guild from "../models/guild";

export class VorteGuild {
  guild: any;
  constructor() {
    this.guild;
  }
  async _load(g: guild) {
    this.guild = await Guild.findOne({ guildID: g.id }) || new Guild({
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
    this.guild.case++;
    this.guild.save().catch(console.error);
    return this;
  }
  setPrefix(prefix: string): this {
    this.guild.prefix = prefix;
    this.guild.save().catch(console.error);
    return this;
  }
  addAutoRole(role: string): this | void {
    this.guild.autoRoles.push(role);
    this.guild.save().catch(console.error);
    return this;
  }
  removeAutoRole(role: string): this {
    const index = this.guild.autoRoles.findIndex((x: string) => x === role);
    if (!index) return this;
    this.guild.autoRoles.splice(index, 1);
    this.guild.save().catch(console.error);
    return this;
  }
  get this() {
    return this.guild;
  }
  get prefix() {
    return this.guild.prefix;
  }
};