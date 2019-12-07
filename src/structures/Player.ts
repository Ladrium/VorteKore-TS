import { VorteClient } from "./VorteClient";
import { PlayerManager } from "discord.js-lavalink";
import { get } from "../util";
import { Queue } from "./Queue";
import nodes from "../config";
export class Player {
  bot: VorteClient;
  lavalink?: PlayerManager;
  queue: typeof Queue;
  constructor(bot: VorteClient) {
    this.bot = bot;
    this.lavalink;
    this.queue = Queue;
  }
  getSongs(query: string) {
    const output = get(`http://${nodes[0].host}:${nodes[0].port}/loadtracks?identifier=ytsearch%3A${encodeURIComponent(query)}`,
      { headers: { Authorization: nodes[0].password } });
    return output;
  }
  _init() {
    this.lavalink = new PlayerManager(this.bot, nodes, {
      user: this.bot.user!.id,
      shards: 0
    });
  }
}