import { Guild as guild } from "discord.js";
import Guild from "../models/guild";

export class VorteGuild {
  public guild?: any;
  constructor(
    public g: guild
  ) {
    this._load();
  }

  public _load() {
    Guild.findOne({ guildID: this.g.id }).then((guild) => this.guild = guild);
    if (!this.guild) this.guild = new Guild({
      guildID: this.g.id,
      case: 0,
      prefix: "!",
      autoRoles: [],
      staffRoles: [],
      welcome: {},
      leave: {},
      logs: {
        deleteMessage: false,
        editMessage: false,
        ban: false,
        kick: false,
        mute: false,
        warn: false,
        lockdown: false,
        slowmode: false,
        roleRemove: false,
        roleAdd: false,
      }
    });
    return this;
  }

  public static delete(guild: guild) {
    Guild.deleteOne({ guildID: guild.id }, (err) => {
      if (err) console.log(err);
    });
  }

  public increaseCase(): this {
    this.guild.case++;
    this.guild.save().catch(console.error);
    return this;
  }

  public setPrefix(prefix: string): this {
    this.guild.prefix = prefix;
    this.guild.save().catch(console.error);
    return this;
  }

  public addRole(locale: string, role: string): this {
    if (locale == "ar") locale = "autoRoles";
    else if (locale == "staff") locale = "staffRoles";
    console.log(locale);
    console.log(this.guild);
    this.guild[locale].push(role);
    this.guild.save().catch(console.error);
    return this;
  }
  
  public removeRole(locale: string, role: string): this {
    if (locale == "ar") locale = "autoRoles";
    else if (locale == "staff") locale = "staffRoles";
    const index = this.guild[locale].findIndex((x: string) => x === role);
    if (!index) return this;
    this.guild[locale].splice(index, 1);
    this.guild.save().catch(console.error);
    return this;
  }
  
  public setLog(log: string, query: string | boolean): void {
    if (log === "channel") this.guild.logs.channel = query;
    else {
      if (query === "enable") query = true
      else if (query === "disable") query = false
      else query = false;
      this.guild.logs[log] = query;
    }

    this.guild.save().catch(console.error);
  }

  public setAutoMessage(locale: string, toSet: string, query: string | boolean): void {
    this.guild[locale][toSet] = query;
    this.guild.save().catch(console.error);
  }
  
  public getLog(log: string) {
    return {
      enabled: this.guild.logs[log] ? this.guild.logs[log] : false,
      channel: this.guild.logs.channel
    }
  }

  public get autoRoles() {
    return this.guild.autoRoles;
  }

  public get prefix() {
    return this.guild.prefix;
  }

  public get case() {
    return this.guild.case;
  }
  
  public get welcome() {
    return {
      enabled: this.guild.welcome.enabled,
      message: this.guild.welcome.message,
      channel: this.guild.welcome.channel
    }
  }
  
  public get leave() {
    return {
      enabled: this.guild.leave.enabled,
      message: this.guild.leave.message,
      channel: this.guild.leave.channel
    }
  }
}