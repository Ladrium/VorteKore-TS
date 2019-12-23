import mute from "../models/mutes";
export class Mute {
  public mute: any;

  public constructor(
    public userID: string, 
    public guildID: string
  ) {}
 
  public setTime(time: number): void {
    this.mute.time = time;
    this.mute.save().catch(console.error);
  }

  public _load(): this {
    this.mute = new mute({
      userID: this.userID,
      guildID: this.guildID,
    });
    return this;
  }

  public static async getAll() {
    const mutes = await mute.find({});
    return mutes || null;
  }

  public static deleteOne(guildID: string, userID: string) {
    mute.deleteOne({ guildID: guildID, userID: userID }, (err) => {
      if (err) console.error(err);
    });
  }

  public static async getOne(userID: string, guildID: string) {
    const thisMute = await mute.findOne({ userID: userID, guildID: guildID });
    return thisMute || null;
  }
}