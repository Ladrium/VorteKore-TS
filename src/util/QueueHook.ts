import { listen, NowPlaying, VorteQueue } from "../lib";
import { Hook } from "../lib/classes/Hook";
import { Util } from "discord.js";

export class QueueHook extends Hook {
  public emitter!: VorteQueue;

  @listen("last_man_standing")
  public async last_man_standing({ player } = this.emitter) {
    await player.message.sem("Oh okay... I'm all alone *sobs*, I might as well leave :(");
    return player.node.leave(player.guildId);
  }

  @listen("next")
  public async next({ song }: NowPlaying, { player }: VorteQueue = this.emitter) {
    return player.message!.sem(`Now playing **[${Util.escapeMarkdown(song!.info.title)}](${song!.info.uri})** because <@${song!.requester}> requested it.`, { type: "music" });
  }

  @listen("finish")
  public async finish({ player }: VorteQueue = this.emitter) {
    player.message!.sem(`There are no more songs left in the queue 👋\n*Psssst* If you liked the quality give us some feedback with \`!feedback\``, { type: "music" });
    return player.node.leave(player.guildId);
  }
}