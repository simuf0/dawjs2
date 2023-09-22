import { Directive, HostListener } from '@angular/core';
import { KeyboardService } from './services/keyboard.service';
import keyMidi from "./datasets/key-midi";

@Directive({
  selector: '[listener]'
})
export class ListenerDirective {

  private _activeKeys: string[] = [];

  constructor(private keyboardService: KeyboardService) {
  }

  private get _allowedKeys(): string[] {
    return Array.from(keyMidi, x => x.key);
  }

  @HostListener("window:keydown", ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    if (this._isAllowedKey(event.key) && !this._isActiveKey(event.key)) {
      this._activeKeys.push(event.key);
      this.keyboardService.emitKeyboardSignal("keydown", event.key);
    }
  }

  @HostListener("window:keyup", ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    if (this._isAllowedKey(event.key) && this._isActiveKey(event.key)) {
      this._activeKeys = this._activeKeys.filter(x => x !== event.key);
      this.keyboardService.emitKeyboardSignal("keyup", event.key);
    }
  }

  private _isActiveKey(key: string): boolean {
    return this._activeKeys.indexOf(key) !== -1;
  }

  private _isAllowedKey(key: string): boolean {
    return this._allowedKeys.indexOf(key) !== -1;
  }

}