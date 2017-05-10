import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

const baseUrl = "/api";

const headers = new Headers();
headers.set("Content-Type", "application/x-www-form-urlencoded");

@Injectable()
export class MusicService {

  constructor(
    private http: Http
  ) { }

  public getMusic(
    search: string = "动物世界",
    type: number = 1,
    offset: number = 0,
    total: boolean = true,
    limit: number = 20
  ) {
return this.http.post(`${baseUrl}/api/search/get/web?csrf_token=`,
    this.serializer({
      s: search,
      type,
      offset,
      total,
      limit
    }), {
      headers
    })
    .subscribe(res => {
      console.log(res);

    })
  }

  private serializer(obj: {[key: string]: any}) {
    let strArr = [];
    let key;
    for (key in obj) {
        strArr.push(`${key}=${obj[key]}`);
    };
    return strArr.join("&");
  }

}
