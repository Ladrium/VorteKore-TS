import { model, Schema } from "mongoose";

const Guild = new Schema({
  guildID: String,
  case: Number,
  ecoMsg: Boolean,
  logs: {
    deleteMessage: Boolean,
    editMessage: Boolean,
    ban: Boolean,
    kick: Boolean,
    mute: Boolean,
    warn: Boolean,
    lockdown: Boolean,
    slowmode: Boolean,
    roleRemove: Boolean,
    roleAdd: Boolean,
    channel: String,
  },
  welcome: {
    enabled: Boolean,
    channel: String,
    message: String,
  },
  leave: {
    enabled: Boolean,
    channel: String,
    message: String,
  },
  prefix: String,
  autoRoles: Array,
  staffRoles: Array,
});


export default model("Guild", Guild);