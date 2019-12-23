import { TrackInfo } from "discord.js-andesite";
import { VortePlayer } from "./VortePlayer";

export class Queue {
  public next: TrackInfo[] = [];

  constructor(
    public player: VortePlayer
  ) {}
  
  public addSong(tracks: TrackInfo[]) {
    this.next.push(tracks[0]);
  }

  public removeSong(position = 0) {
    if (!this.next[position]) return;
    if (position === 0) {
      this.next.shift();
      return;
    }
    this.next = this.next.splice(position, 1);
  }

  public nextSong() {
    return this.next[0] || null;
  }
};