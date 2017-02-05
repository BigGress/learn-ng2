import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class BingImageService {
  imageUrl: string;
  headers = new Headers({
    "Content-Type": "application/json",
    'Ocp-Apim-Subscription-Key': 'db4c9fc9ebd84191b3df78c3a03eaccb'
  })

  constructor(
    private http: Http
  ) {
    const q = "风景";
    const baseUrl: string = `https://api.cognitive.microsoft.com/bing/v5.0/images/search`;
    this.imageUrl = `${baseUrl}?q=${q}&count=5&mkt=zh-CN&imageType=Photo&size=Large`;
  }

  getImageUrl() {
    return this.http.post(this.imageUrl,{},{headers: this.headers})
              .map(res => res.json().value as any[]);
  }
}
