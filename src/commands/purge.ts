import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed";
import { userInfo } from "os";

export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "purge",
      category: "Moderation",
      cooldown: 5000
    })
  }
  run(message: Message, args: string[]) {
    if (!args[0]) return message.channel.send(new VorteEmbed(message).baseEmbed().setDescription("Please provide a number."));
    const num = parseInt(args[0]);
    const member = message.mentions.users!.first() || message.guild!.members.find(x => x.displayName === args[0] || x.id === args[0]);
    if (member) {
      message.channel.messages.fetch({
        limit: num
      }).then((messages) => {
        messages = messages.filter(m => m.id === member!.id)
        message.channel.bulkDelete(messages);
        message.channel.send(new VorteEmbed(message).baseEmbed().setDescription(`Successfully deleted ${num} messages.`))
      });
    } else {
      message.channel.bulkDelete(num);
      message.channel.send(new VorteEmbed(message).baseEmbed().setDescription(`Successfully deleted ${num} messages.`))
    };
  }
};