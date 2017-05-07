import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
} from '@angular/core';

import { Observable, Subscriber } from "rxjs";

import { YoutubeService } from "../common/service";

@Component({
  selector: 'app-search-box',
  outputs: ["search"],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @ViewChild("search") dom: ElementRef;

  search: EventEmitter<any> = new EventEmitter();

  constructor(
    // private load: LoadingService
    private service: YoutubeService
  ) {
  }

  ngOnInit() {
    console.log(this.dom);
    Observable.fromEvent(this.dom.nativeElement, "keyup")
              .map((e: MouseEvent) => e.target["value"])
              .filter((e: string) => e.length > 0)
              .debounceTime(200)
              .map((e) => {
                return this.service.search(e)
              })
              .switch()
              ["subscribe"]((e) => {
                  console.log(`搜索结束`);
                  this.search.emit(e);
              }, (err) => {
                console.error(err);

              })
  }

}
