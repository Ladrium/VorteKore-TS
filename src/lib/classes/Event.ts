import { VorteModule, VorteModuleOptions } from "./Module";
import { EventEmitter } from "events";
import Logger from "@ayana/logger";

export type EventType = "on" | "off" | "once";
export interface EventOptions extends VorteModuleOptions {
	type?: EventType;
	emitter?: string | EventEmitter;
	event: string;
}

export class Event extends VorteModule {

	static logger: Logger = Logger.get(Event);

	public logger: Logger = Event.logger;
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