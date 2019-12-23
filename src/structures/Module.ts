import { VorteClient } from "./VorteClient";
import { Handler } from "./Handler";

export interface VorteModuleOptions {
	disabled?: boolean;
	category?: string;
}

export class VorteModule {

	public category: string;
	public disabled: boolean;

	protected bot!: VorteClient;
	protected handler!: Handler;

	public constructor(
		public name: string,
		{
			category = "general",
			disabled = false
		}: VorteModuleOptions
	) {
		this.category = category;
		this.disabled = disabled;
	}

	public _onLoad(handler: Handler) {
		this.bot = handler.bot;
		this.handler = handler;
	}
}