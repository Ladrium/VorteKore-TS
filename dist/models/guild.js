"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Guild = new mongoose_1.Schema({
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
exports.default = mongoose_1.model("Guild", Guild);
