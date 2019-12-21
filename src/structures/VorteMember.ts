import Member from "../models/member";

export class VorteMember {
  member: any;
  id: string;
  guildid: string;
  constructor(id: string, guildID: string) {
    this.member;
    this.id = id;
    this.guildid = guildID;
    this._init();
  }
  async _init() {
    let member = await Member.findOne({ id: this.id })
    if (!member) member = new Member({
      id: this.id,
      guildID: this.guildid,
      coins: 50,
      xp: 0,
      level: 0
    });
    this.member = member;
    return this;
  };
  get coins() {
    return this.member.coins;
  }
  get xp() {
    return this.member.xp;
  }
  get level() {
    return this.member.level;
  }
  add(locale: string, amount: number) {
    this.member[locale] += amount;
  }
  set(locale: string, toSet: number) {
    this.member[locale] = toSet;
  }
  save() {
    this.member.save().catch(console.error);
  }
};