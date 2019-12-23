import { Client, ClientOptions, Collection } from "discord.js";
import { Handler } from "./Handler";
import { Mute } from "./Mute";
import { Command } from "./Command";
import { Manager } from "discord.js-andesite";
import { nodes } from "../config"
import { VortePlayer } from "./VortePlayer";
import { Queue } from "./Queue";

export class VorteClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public aliases: Collection<string, string> = new Collection();
  public handler?: Handler;
  public andesite: Manager<VortePlayer> = new Manager(this, { 
    nodes,
    player: (node, options) => new VortePlayer(node, options),
    restTimeout: 20000
  });
  public queues: Collection<string, Queue> = new Collection();

  constructor(options?: ClientOptions) {
    super(options);
    this.on("ready", () => {
      console.log(`${this.user!.username} is ready to rumble!`);
      this.andesite.init(this.user!.id);

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
        })
      }, 5000)
    })
  }
}