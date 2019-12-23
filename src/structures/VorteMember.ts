import Member from "../models/member";

export class VorteMember {
  public member: any;
  
  public  constructor(
    public id: string, 
    public guildID: string) 
  {
    this._init();
  }

  public async _init() {
    let member = await Member.findOne({ id: this.id })
    if (!member) member = new Member({
      id: this.id,
      guildID: this.guildID,
      coins: 50,
      xp: 0,
      level: 0
    });
    this.member = member;
    return this;
  };

  public  get coins() {
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