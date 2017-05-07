import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { SearchResult } from "../common/service";

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css'],
  host: {
    class: "result-box"
  }
})
export class ResultItemComponent implements OnInit {
  @Input() video: SearchResult;

  constructor() { }

  ngOnInit() {
  }

}
