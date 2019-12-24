import { Hook } from "../lib/music/Hook";
import { VorteQueue, NowPlaying, VorteEmbed } from "../lib";
import { listen } from "../lib/music/Decorator";

export class QueueHook extends Hook {
  public emitter!: VorteQueue;

  @listen("next")
  public async next({ song }: NowPlaying, { player }: VorteQueue = this.emitter) {
    return player.message!.sem(`Now playing **[${song!.info.title}](${song!.info.uri})**.`);
  }

  @listen("finish")
  public async finish({ player }: VorteQueue = this.emitter) {
    player.message!.sem(`There are no more songs left in the queue 👋!`);
    return player.node.leave(player.guildId);
  }
}