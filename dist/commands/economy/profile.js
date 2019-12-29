"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("profile", {
            aliases: ["profile", "me"],
            description: "Displays your profile in an embed.",
            channel: "guild",
            usage: "[action] <value>",
            example: "!profile set bio I'm cool!",
            category: "Economy"
        });
    }
    async run(message, args) {
        switch (args[0]) {
            case "set":
                switch (args[1]) {
                    case "bio":
                    case "biography":
                        message.profile.bio = args.slice(2).join(" ");
                        message.sem("Successfully updated your bio.");
                        await message.profile.save();
                        break;
                    default:
                        message.sem("The only setting avaliable is **bio**");
                        break;
                }
                break;
            default:
                const { level, xp, bio, coins, warns } = message.profile;
                message.channel.send(new lib_1.VorteEmbed(message).baseEmbed()
                    .setDescription(bio)
                    .setThumbnail(message.author.displayAvatarURL())
                    .addField("\u200b", [
                    `**Level**: ${level}`,
                    `**Exp**: ${Math.round(xp)}`,
                    `**Coins**: ${Math.round(coins)}`,
                    `**Warns**: ${warns}`
                ].join("\n")));
                break;
        }
    }
}
exports.default = default_1;
