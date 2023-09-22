import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListenerDirective } from './listener.directive';

@NgModule({
  declarations: [
    ListenerDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListenerDirective
  ]
})
export class MidiModule { }
