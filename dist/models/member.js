"use strict";
const mongoose_1 = require("mongoose");
const memberSchema = new mongoose_1.Schema({
    id: String,
    guildID: String,
    coins: Number,
    xp: Number,
    level: Number
});
module.exports = mongoose_1.model("member", memberSchema);
