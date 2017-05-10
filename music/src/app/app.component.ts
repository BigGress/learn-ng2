import { Component } from '@angular/core';
import { MusicService } from "./service/music/music.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(
    public service: MusicService
  ) {
    this.service.getMusic();
    console.log(123);

  }
}
