import { GuildMember, Message, MessageOptions, Structures, MessageEmbed } from "discord.js";
import { VorteGuild } from "../database/VorteGuild";
import { VorteMember } from "../database/VorteMember";
import { VorteEmbed } from "./VorteEmbed";

Structures.extend("Message", (msg) =>
	class VorteMessage extends msg {
		public sem(content: string, { type = "normal", ...options } = {}): Promise<Message> {
			const _ = new VorteEmbed(this);
			const e: MessageEmbed = (_ as any)[`${type === "normal" ? "base" : type}Embed`]();
			e.setDescription(content);
			return this.channel.send(e);
		}

		public getMember(member: string | GuildMember = this.member!): VorteMember | null {
			if (!this.guild) return null;
			return new VorteMember(
				typeof member === "string"
					? member
					: member.id,
				this.guild.id
			);
		}

		public getGuild(): VorteGuild | null {
			if (!this.guild) return null;
			return new VorteGuild(this.guild);
		}
	}
)

export interface VorteMessage extends Message {
	sem(content: string, options?: { type: "normal" | "error" | "music" } & MessageOptions): Promise<VorteMessage>;
	getMember(member?: string | GuildMember): VorteMember | null;
	getGuild(): VorteGuild | null;
}