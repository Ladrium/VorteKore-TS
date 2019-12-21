"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Mute = new mongoose_1.Schema({
    guildID: String,
    userID: String,
    time: Number,
});
exports.default = mongoose_1.model("mutes", Mute);
