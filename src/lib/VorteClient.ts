import { Client, ClientOptions, Collection, VoiceChannel } from "discord.js";
import { Handler } from "./classes/Handler";
import { Mute } from "./database/Mute";
import { Command } from "./classes/Command";
import { Manager } from "discord.js-andesite";
import { nodes } from "../config"
import { VortePlayer, VorteQueue } from ".";
import DBL from "dblapi.js";

export class VorteClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public aliases: Collection<string, string> = new Collection();
  public handler: Handler = new Handler(this);
  public andesite: Manager = new Manager(this, {
    nodes,
    player: VortePlayer,
    restTimeout: 20000
  });
  public queues: Collection<string, VorteQueue> = new Collection();
  public dbl?: DBL;

  constructor(options?: ClientOptions) {
    super(options);
    this.on("ready", () => {
      console.log(`${this.user!.username} is ready to rumble!`);
      this.andesite.init(this.user!.id);

      if (process.env.NODE_ENV!.ignoreCase("production")) {
        this.dbl = new DBL(process.env.DBL_TOKEN!, {
          statsInterval: 900000,
          webhookAuth: process.env.DBL_WEBHOOK_AUTH,
          webhookPath: process.env.DBL_WEBHOOK_PATH,
          webhookPort: 3001
        }, this);
      }

      setInterval(async () => {
        const mutes = await Mute.getAll();

        mutes.forEach(async (x: any) => {
          if (x.time <= Date.now()) {
            const guild = this.guilds.get(x.guildID);
            if (!guild) return Mute.deleteOne(x.guildID, x.userID);

            const member = guild.members.get(x.userID) || await guild.members.fetch(x.userID) || null;
            if (!member) return Mute.deleteOne(x.guildID, x.userID);

            const muteRole = guild.roles.find((x) => x.name.toLowerCase() === "muted");
            member.roles.remove(muteRole!).catch(null);
            return Mute.deleteOne(x.guildID, x.userID);
          }
        });

        const players = <Collection<string, VortePlayer>> this.andesite.players;
        for (const [, player] of players) {
          const channel = this.channels.get(player.channelId)! as VoiceChannel;
          if (!(channel.members.filter(m => !m.user.bot).size)) 
            return player.queue.emit("last_man_standing");  
        }
      }, 5000)
    })
  }
}