import mute from "../models/mutes";
export class Mute {
  userID: string;
  guildID: string;
  mute: any;
  constructor(userID: string, guildID: string) {
    this.userID = userID;
    this.guildID = guildID;
    this.mute;
  }
  _load(): this {
    this.mute = new mute({
      userID: this.userID,
      guildID: this.guildID,
    });
    return this;
  }
  static async getAll() {
    const mutes = await mute.find({});
    return mutes || null;
  }
  static deleteOne(guildID: string, userID: string) {
    mute.deleteOne({ guildID: guildID, userID: userID }, (err) => {
      if (err) console.error(err);
    });
  }
  static async getOne(userID: string, guildID: string) {
    const thisMute = await mute.findOne({ userID: userID, guildID: guildID });
    return thisMute || null;
  }
  setTime(time: number) {
    this.mute.time = time;
    this.mute.save().catch(console.error);
  }
}