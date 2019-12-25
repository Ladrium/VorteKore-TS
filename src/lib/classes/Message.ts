import { GuildMember, Message, MessageOptions, Structures } from "discord.js";
import { VorteGuild } from "../database/VorteGuild";
import { VorteMember } from "../database/VorteMember";
import { VorteEmbed } from "./VorteEmbed";

Structures.extend("Message", (msg) =>
	class VorteMessage extends msg {
		public sem(content: string, { type = "normal", ...options }: { type?: "normal" | "error" } & MessageOptions = {}): Promise<Message> {
			const _ = new VorteEmbed(this);
			let e = type === "normal" ? _.baseEmbed() : _.errorEmbed();
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
	sem(content: string, options?: { type: "normal" | "error" } & MessageOptions): Promise<VorteMessage>;
	getMember(member?: string | GuildMember): VorteMember | null;
	getGuild(): VorteGuild | null;
}