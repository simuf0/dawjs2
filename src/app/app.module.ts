import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AudioContextModule } from "angular-audio-context";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AudioContextModule.forRoot("balanced")
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
