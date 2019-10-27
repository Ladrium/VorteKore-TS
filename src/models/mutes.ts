import { model, Schema } from "mongoose";

const Mute = new Schema({
  guildID: String,
  userID: String,
  time: Number,
});


export default model("mutes", Mute);