import {EventEmitter} from "events";
import {AndesitePlayer, TrackInfo} from "discord.js-andesite";
import { shuffle } from "../../util";
import { VortePlayer } from "./VortePlayer";
import { QueueHook } from "../../util/QueueHook";


export interface NowPlaying {
  position?: number;
  song?: QueuedSong;
  skips: Set<string>;
}

export type QueuedSong = TrackInfo & { requester?: string }
export interface Repeat {
  queue: boolean;
  song: boolean;
}

export class VorteQueue extends EventEmitter {
  public next: QueuedSong[] = [];
  public previous: QueuedSong[] = [];
  public repeat: Repeat = { queue: false, song: false };
  public np: NowPlaying = { position: 0, skips: new Set() };
  public hook: QueueHook = new QueueHook(this);

  public constructor(
    public readonly player: VortePlayer,
  ) {
    super();

    this.player.on("end", async (d: { [key: string]: any }) => {
      if (d.type !== 'TrackEndEvent' || !['REPLACED', 'STOPPED'].includes(d.reason)) {
        if (!this.repeat.song) this._next();
        if (this.repeat.queue && !this.np.song) {
          const previous = this.previous.reverse();
          this.clear();
          this.add(previous);
          this._next();
        }
        if (!this.np.song) return this.emit("finish");
        this.emit("next", this.np);
        await this.player.play(this.np.song.track);
      }
    }).on("player-update", (d) => {
      this.np.position = d.state.position;
    });
  }

  public add(songs: TrackInfo[], requester?: string): number {
    if (!songs.length) return 0;
    return this.next.push(...songs.map(song => ({ requester, ...song })));
  }

  public async _next() {
    const next = this.next.shift();
    if (this.np.song) this.previous.unshift(this.np.song);
    this.np = { song: next, position: 0, skips: new Set() };
  }

  public async start(): Promise<boolean> {
    if (!this.np.song) this._next();
    await this.player.play(this.np.song!.track);
    return this.emit("start", this.np);
  }

  public stop(): Promise<AndesitePlayer> | void {
    return this.player.stop();
  }

  public async move(from: number, to: number): Promise<TrackInfo[]> {
    if (to >= this.next.length) {
      let k = to - this.next.length + 1;
      while (k--) {
        this.next.push(<any> undefined);
      }
    }

    this.next.splice(to, 0, this.next.splice(from, 1)[0]);
    return this.next;
  }

  public length(): number {
    return this.next.length;
  }

  public sort(predicate?: (a: TrackInfo, b: TrackInfo) => number): TrackInfo[] {
    return this.next.sort(predicate);
  }

  public clear(stop: boolean = false) {
    this.next = [];
    this.previous = [];
    this.np = { position: 0, skips: new Set() };
    if (stop) this.stop();
  }

  public shuffle(): TrackInfo[] {
    return this.next = shuffle(this.next);
  }
}