import {getAllListeners, listen} from "./Decorator";

/**
 * A class that helps with events and such.
 * @since 1.0.0
 */
export class Hook {
  /**
   * The emitter that this hook is meant for.
   */
  readonly emitter!: NodeJS.EventEmitter;

  /**
   * Creates a new Emitter Hook.
   * @param emitter The emitter that this hook is created for.
   */
  public constructor(
    emitter: NodeJS.EventEmitter
  ) {
    Object.defineProperty(this, "emitter", {value: emitter});
    this._listen();
  }

  /**
   * Register a listener. Created for JavaScript Users.
   * @param fn The listener.
   * @param event The event to listen for.
   */
  public register(fn: Function, event: string) {
    if (this.emitter.listenerCount(event)) return;
    listen(event)(this, fn.name, {value: fn});
    this.emitter.addListener(event, fn.bind(this));
  }

  /**
   * Adds listeners to the emitter.
   * @private
   */
  private _listen() {
    const methods = getAllListeners(this);
    for (const method of methods)
      if (!this.emitter.listenerCount(method.event))
        this.emitter.addListener(method.event, method.listener.bind(this));
  }
}