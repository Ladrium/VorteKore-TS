import { VorteMember, Event, VorteMessage, VorteEmbed } from "../../lib";

export default class extends Event {
  private coins = (max: number, min: number): number => Math.floor(Math.random() * max) + min;
  private xp = (max: number, min: number): number => Math.floor(Math.random() * max) + min;
  private recently = new Set();
  public constructor() {
    super("message-received", {
      category: "guild",
      event: "message"
    });
  }

  async run(message: VorteMessage) {
    if (message.author.bot) return;
    const guild = message.getGuild();
    if (message.guild) {
      const member = await new VorteMember(message.author.id, message.guild.id)._init();
      if (!this.recently.has(message.author.id)) {
        if (Math.random() > 0.50) {
          member.add("coins", this.coins(50, 5));
          if (Math.random() > 0.60) {
            member.add("xp", this.xp(25, 2));
            if (member.xp > 2 * (75 * member.level)) {
              member.add("level", 1);
              if (guild && guild!.ecoMsg)
                message.sem(`Congrats 🎉! You're now level ${member.level}`);
            }
          }
          member.save();
          this.recently.add(message.author.id);
          setTimeout(() => this.recently.delete(message.author.id), 25000)
        }
      }
    }
    return this.handler!.runCommand(message);
  };
}