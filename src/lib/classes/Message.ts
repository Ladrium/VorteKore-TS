import { Message, MessageOptions, Structures, MessageEmbed } from "discord.js";
import { VorteEmbed } from "./VorteEmbed";

Structures.extend("Message", (msg) => 
	class VorteMessage extends msg {
		public sem(content: string, { type = "normal", ...options }: { type?: "normal" | "error" } & MessageOptions = {}): Promise<Message> {
			const _ = new VorteEmbed(this);
			let e = type === "normal" ? _.baseEmbed() : _.errorEmbed();
			e.setDescription(content);
			return this.channel.send(e);
		}
	}
)

export interface VorteMessage extends Message {
	sem(content: string, options?: { type: "normal" | "error" } & MessageOptions): Promise<VorteMessage>;
}