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
  addRole(locale: string, role: string): this {
    if (locale == "ar") locale = "autoRoles";
    else if (locale == "staff") locale = "staffRoles";
    console.log(locale);
    console.log(this.guild);
    this.guild[locale].push(role);
    this.guild.save().catch(console.error);
    return this;
  }
  removeRole(locale: string, role: string): this {
    if (locale == "ar") locale = "autoRoles";
    else if (locale == "staff") locale = "staffRoles";
    const index = this.guild[locale].findIndex((x: string) => x === role);
    if (!index) return this;
    this.guild[locale].splice(index, 1);
    this.guild.save().catch(console.error);
    return this;
  }
  setLog(log: string, query: string | boolean) {
    if (log === "channel") this.guild.logs.channel = query;
    else this.guild.logs[log] = query;
    this.guild.save().catch(console.error);
  }
  setAutoMessage(locale: string, toSet: string, query: string | boolean) {
    this.guild[locale][toSet] = query;
    this.guild.save().catch(console.error);
  }
  getLog(log: string) {
    return {
      enabled: this.guild.logs[log] ? this.guild.logs[log] : false,
      channel: this.guild.logs.channel
    }
  }
  get prefix() {
    return this.guild.prefix;
  }
  get case() {
    return this.guild.case;
  }
  get welcome() {
    return {
      enabled: this.guild.welcome.enabled,
      message: this.guild.welcome.message,
      channel: this.guild.welcome.channel
    }
  }
  get leave() {
    return {
      enabled: this.guild.leave.enabled,
      message: this.guild.leave.message,
      channel: this.guild.leave.channel
    }
  }
}