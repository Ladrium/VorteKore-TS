import { member } from "../../models/member";

export class VorteMember {
  public member: any;

  public constructor(
    public id: string,
    public guildID: string
  ) {
    this._init();
  }

  public async _init() {
    let mem = await member.findOne({ id: this.id })
    if (!mem) mem = new member({
      id: this.id,
      guildID: this.guildID,
      coins: 50,
      xp: 0,
      level: 0
    });
    this.member = mem;
    return this;
  };

  public get coins() {
    return this.member.coins;
  }

  public get xp() {
    return this.member.xp;
  }

  public get level() {
    return this.member.level;
  }

  public add(locale: string, amount: number) {
    this.member[locale] += amount;
  }

  public set(locale: string, toSet: number) {
    this.member[locale] = toSet;
  }

  public save() {
    this.member.save().catch(console.error);
  }
};