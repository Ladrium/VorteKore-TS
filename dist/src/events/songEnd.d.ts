import { VorteClient } from "../structures/VorteClient";
import { Queue } from "../structures/Queue";
import { Player } from "discord.js-lavalink";
import { Message } from "discord.js";
declare const _default: (bot: VorteClient, data: any, player: Player, queue: Queue, { guild, channel }: Message) => boolean | undefined;
export = _default;
