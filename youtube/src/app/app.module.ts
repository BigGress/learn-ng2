import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchBoxComponent } from "./search-box/search-box.component";

import { LoadingService, YoutubeService } from "./common/service";
import { ResultItemComponent } from './result-item/result-item.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    ResultItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    LoadingService,
    YoutubeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
