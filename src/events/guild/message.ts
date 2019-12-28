import { Event, VorteMessage } from "../../lib";

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
    if (message.author.bot || !this.bot.database.ready) return;

    await message.init();
    
    if (message.guild) {
      if (!this.recently.has(message.author.id)) {
        if (Math.random() > 0.50) {
          message.profile.add("coins", this.coins(50, 5));
          if (Math.random() > 0.60) {
            message.profile.add("xp", this.xp(25, 2));
            if (message.profile.xp > 2 * (75 * message.profile.level)) {
              message.profile.add("level", 1);
              try {
                if (message._guild && !message._guild!.levelUpMsg)
                  message.sem(`Congrats 🎉! You're now level ${message.profile.level}`); 
              } catch(e) {}
            }
          }
          message.profile.save();
          this.recently.add(message.author.id);
          setTimeout(() => this.recently.delete(message.author.id), 25000)
        }
      }
    }
    return this.handler!.runCommand(message);
  };
}