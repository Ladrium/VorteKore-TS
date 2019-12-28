import { Message, MessageEmbed, MessageOptions, Structures } from "discord.js";
import { GuildEntity } from "../../models/Guild";
import { ProfileEntity } from "../../models/Profile";
import { VortePlayer } from "../music/VortePlayer";
import { VorteClient } from "../VorteClient";
import { VorteEmbed } from "./VorteEmbed";

Structures.extend("Message", (msg) =>
	class VorteMessage extends msg {
		public profile!: ProfileEntity;
		public _guild!: GuildEntity;
		public client!: VorteClient;

		public async init() {
			if (this.guild && !this.author.bot) {
				this._guild = await this.client.database.getGuild(this.guild!.id);
				this.profile = await this.client.database.getProfile(this.author.id, this.guild!.id);
			}
		}

		public sem(content: string, { type = "normal", ...options } = {}): Promise<Message> {
			const _ = new VorteEmbed(<any> this);
			const e: MessageEmbed = (_ as any)[`${type === "normal" ? "base" : type}Embed`]();
			e.setDescription(content);
			return this.channel.send(e);
		}

		public get player(): VortePlayer | undefined {
			if (!this.guild) return;
			const id = this.guild.id;
			return <VortePlayer>this.client.andesite.players.get(id);
		}
	}
)

export interface VorteMessage extends Message {
	sem(content: string, options?: { type: "normal" | "error" | "music" } & MessageOptions): Promise<VorteMessage>;
	player: VortePlayer | undefined;
	profile: ProfileEntity;
	_guild: GuildEntity;
	init(): Promise<void>
}