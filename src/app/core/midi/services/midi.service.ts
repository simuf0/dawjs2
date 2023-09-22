import { Injectable, Inject } from "@angular/core";
import { MIDI_ACCESS, MIDI_SUPPORT } from "@ng-web-apis/midi";
import { Subject } from 'rxjs';
import parseMidi from "parse-midi";
import { MIDISignal } from "../entities/midi-signal.entity";

@Injectable({
  providedIn: 'root'
})
export class MIDIService {

  public signal$ = new Subject<MIDISignal>();

  constructor(
    @Inject(MIDI_SUPPORT)
    public readonly isMIDISupported: boolean,

    @Inject(MIDI_ACCESS)
    private readonly getMIDIAccess: Promise<WebMidi.MIDIAccess>,
  ) {
    if (isMIDISupported) {
      this.getMIDIAccess.then(midiAccess => {
        this._onMIDIAccess(midiAccess);
      })
      .catch(this._onMIDIFailure);
    }
  }

  emitMIDISignal(signal: MIDISignal): void {
    this.signal$.next(signal);
  }

  private _onMIDIAccess(midiAccess: WebMidi.MIDIAccess): void {
    const inputs = midiAccess.inputs.values();
    for (let i = inputs.next(); i && !i.done; i = inputs.next()) {
      i.value.onmidimessage = (message: WebMidi.MIDIMessageEvent) => {
        this._onMIDIMessage(message);
      }
    }
  }

  private _onMIDIFailure() {
    console.error("Failed accessing MIDI devices");
  }

  private _onMIDIMessage(message: WebMidi.MIDIMessageEvent): void {
    const midiMessage = parseMidi(message.data);
    if (
      midiMessage.messageType === "noteon"
      || midiMessage.messageType === "noteoff"
    ) {
      this.emitMIDISignal({
        messageCode: midiMessage.messageCode,
        channel: midiMessage.channel,
        note: midiMessage.key,
        velocity: midiMessage.velocity,
      });
    }
  }

}