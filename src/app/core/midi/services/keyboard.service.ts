import { Injectable } from "@angular/core";
import { MIDIService } from "./midi.service";
import keyMidi from "../datasets/key-midi";

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {

  constructor(private midiService: MIDIService) {
  }

  emitKeyboardSignal(eventType: "keydown" |"keyup", key: string): void {
    this.midiService.emitMIDISignal({
      messageCode: (eventType == "keydown") ? 144 : 128,
      channel: 1,
      note: this._resolveMIDIKey(key) as number,
      velocity: 127,
    });
  }

  private _resolveMIDIKey(key: string): number|undefined {
    return keyMidi.find(k => k.key == key)?.midiKey;
  }
}