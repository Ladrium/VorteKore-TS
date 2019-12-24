import { Message } from "discord.js";
import { VorteClient, VorteMember, VorteEmbed, VorteMessage } from "../lib";

const recently = new Set();

const coins = (max: number, min: number): number => Math.floor(Math.random() * max) + min;
const xp = (max: number, min: number): number => Math.floor(Math.random() * max) + min;

export = async (bot: VorteClient, message: VorteMessage) => {
  if (message.author.bot || !message.guild) return;
  const member = await new VorteMember(message.author.id, message.guild.id)._init();
  if (!recently.has(message.author.id)) {
    if (Math.random() > 0.50) {
      member.add("coins", coins(50, 5));
      if (Math.random() > 0.60) {
        member.add("xp", xp(25, 2));
        if (member.xp > 2 * (75 * member.level)) {
          member.add("level", 1);
          if(message.guild.id !== "264445053596991498")
          message.channel.send(new VorteEmbed(message).baseEmbed().setFooter(`Level Up! New Level: **${member.level}**`));
        }
      }
      member.save();
      recently.add(message.author.id);
      setTimeout(() => recently.delete(message.author.id), 25000)
    }
  }
  bot.handler!.runCommand(message, member);
};