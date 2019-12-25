import { VorteModule, VorteModuleOptions } from "./Module";
import { EventEmitter } from "events";

export type EventType = "on" | "off" | "once";
export interface EventOptions extends VorteModuleOptions {
	type?: EventType;
	emitter?: string | EventEmitter;
	event: string;
}

export class Event extends VorteModule {

	public type: EventType;
	public emitter: string | EventEmitter;
	public event: string;

	public constructor(
		name: string,
		{
			category,
			disabled,
			type = "on",
			emitter = "client",
			event,
		}: EventOptions
	) {
		super(name, { category, disabled });

		this.type = type;
		this.emitter = emitter;
		this.event = event;
	}
}