import { Component } from '@angular/core';

import { SearchResult } from "./common/service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  videos: SearchResult[] = [{
    id: "1",
    title: "test",
    description: "haha",
    videoUrl: "http://www.baidu.com"
  },{
    id: "1",
    title: "test",
    description: "haha",
  },{
    id: "1",
    title: "test",
    description: "haha",
  },{
    id: "1",
    title: "test",
    description: "haha",
  },{
    id: "1",
    title: "test",
    description: "haha",
  },{
    id: "1",
    title: "test",
    description: "haha",
  }];
}
