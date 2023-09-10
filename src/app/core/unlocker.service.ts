import { Injectable } from "@angular/core";
import { AudioContext } from "angular-audio-context";

@Injectable({
  providedIn: 'root'
})
export class UnlockerService {

  private _locked = true;

  constructor(private audioContext: AudioContext) {}

  get isLocked(): boolean {
    return this._locked;
  }

  unlock(): void {
    const node = this.audioContext.createBufferSource();
    node.buffer = this.audioContext.createBuffer(1, 1, 22050);
    node.start(0);
    this._locked = false;
  }
}