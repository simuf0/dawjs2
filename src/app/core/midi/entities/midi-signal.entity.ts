// export interface MIDISignal {
//   cmd: number;
//   channel: number; // [0-16]
//   type: number;
//   note: number; // [21-108] (MIDI number - see: http://newt.phys.unsw.edu.au/jw/notes.html)
//   velocity: number; // [0-127]
// }

export interface MIDISignal {
  messageCode: number;
  channel: number; // [0-16]
  note: number; // [0-127] (MIDI number - see: http://newt.phys.unsw.edu.au/jw/notes.html)
  velocity: number; // [0-127]
}