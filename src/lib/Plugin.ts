import { VorteClient } from "./VorteClient";
import { EventEmitter } from "events";

const SUBSCRIBED_EVENTS_SYMBOL = Symbol("SubscribedEvents");

interface SubscribedEvent {
	listener: Function,
	event: string,
	emitter: string,
	type: "on" | "once" | "off"
}

export abstract class ClientPlugin implements ClientPlugin {
	public abstract name: string;
	public client: VorteClient;
	public onLoad(): any {};
	public onReady(): any { this._listen() };
	public constructor(client: VorteClient) {
		this.client = client;
	}

	public get emitters(): { [key: string]: EventEmitter } {
		return {
			client: this.client,
			andesite: this.client.andesite,
			handler: this.client.handler,
			process
		}
	}

	/**
   * Register a listener. Created for JavaScript Users.
   * @param fn The listener.
   * @param event The event to listen for.
   */
	public register(fn: Function, event: string, { emitter = "client", type = "on" }: { emitter?: string, type?: "on" | "once" | "off" } = {}) {
		if (!this.emitters[emitter]) return;
		if (this.emitters[emitter].listenerCount(event)) return;

		Subscribe(event, { emitter, type })(this, fn.name, { value: fn });
		this.emitters[emitter][type](event, fn.bind(this));
	}

	private _listen() {
		const methods = getAllListeners(this);
		for (const method of methods)
			if (!this.emitters[method.emitter].listenerCount(method.event))
				this.emitters[method.emitter][method.type](method.event, method.listener.bind(this));
	}
}

function getAllListeners(target: any): SubscribedEvent[] {
	if (target.constructor == null) return [];
	const methods = target.constructor[SUBSCRIBED_EVENTS_SYMBOL];
	if (!Array.isArray(methods)) return [];
	return methods;
}

export function Subscribe(event: string, { emitter = "client", type = "on" }: { emitter?: string, type?: "on" | "once" | "off" } = {}) {
	return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
		if (target.prototype !== undefined) throw new Error(`"${target.name}#${String(propertyKey)}": Subscribe can only be applied to non-static methods`);

		if (target.constructor[SUBSCRIBED_EVENTS_SYMBOL] == null)
			Object.defineProperty(target.constructor, SUBSCRIBED_EVENTS_SYMBOL, {
				configurable: false,
				enumerable: false,
				writable: false,
				value: []
			});

		target.constructor[SUBSCRIBED_EVENTS_SYMBOL].push({
			event,
			listener: descriptor.value,
			emitter,
			type
		});
	}
}