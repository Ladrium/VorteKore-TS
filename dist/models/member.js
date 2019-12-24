"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const memberSchema = new mongoose_1.Schema({
    id: String,
    guildID: String,
    coins: Number,
    xp: Number,
    level: Number
});
exports.member = mongoose_1.model("member", memberSchema);
