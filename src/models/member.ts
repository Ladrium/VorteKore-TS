import { model, Schema } from "mongoose";

const memberSchema = new Schema({
  id: String,
  guildID: String,
  coins: Number,
  xp: Number,
  level: Number
});
export const member = model("member", memberSchema);