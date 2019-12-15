import { Guild as guild } from "discord.js";
import Guild from "../models/guild";

export class VorteGuild {
  guild?: any;
  g: guild;
  constructor(g: guild) {
    this.guild;
    this.g = g;
    this._load();
  }
  _load() {
    Guild.findOne({ guildID: this.g.id }).then((guild) => this.guild = guild);
     if(!this.guild) this.guild = new Guild({
      guildID: this.g.id,
      case: 0,
      prefix: "!",
      autoRoles: [],
      staffRoles: [],
      welcome: {},
      leave: {},
      logs: {
        deleteMessage: "enable",
        editMessage: "enable",
        ban: "enable",
        kick: "enable",
        mute: "enable",
        warn: "enable",
        lockdown: "enable",
        slowmode: "enable",
        roleRemove: "enable",
        roleAdd: "enable",
      }
    });
    return this;
  }
  static delete(guild: guild) {
    Guild.deleteOne({ guildID: guild.id }, (err) => {
      if (err) console.log(err);
    });
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
    else {
      if (query === "enable") query = true
      else if (query === "disable") query = false
      else query = false;
      this.guild.logs[log] = query;
    }

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
  get autoRoles() {
    return this.guild.autoRoles;
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