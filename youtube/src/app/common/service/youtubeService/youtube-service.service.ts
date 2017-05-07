import {
  Injectable,
  Inject,
} from '@angular/core';
import { Http, Response } from "@angular/http";

import { LoadingService } from "../";

const API_URL = `https://content.googleapis.com/youtube/v3/search`;
const KEY = `AIzaSyCRaBwIG5QOtLzZUYDjT_nf8L6k6bequBA`;

declare global {
  interface gapi {
  }
}

export class SearchResult {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  videoUrl?: string;

  constructor(obj: SearchResult) {
    Object.assign(this, obj, {
      videlUrl: obj.videoUrl || `https://www.youtube.com/watch?v=${obj.id}`
    });
  }
}

@Injectable()
export class YoutubeService {

  api: any;

  constructor(
    private load: LoadingService,
    private http: Http
  ) {
  }


  search(str: string) {
    this.load.toggleLoading();
    return this.http.get(this.makeUrl(str))
               .map((res: Response) => res.json())
               .map(e => {
                  this.load.toggleLoading();
                  return e.items.map(item => {
                    return new SearchResult({
                      id: item.id.videoId,
                      title: item.snippet.title,
                      description: item.snippet.description,
                      thumbnailUrl: item.snippet.thumbnails.high.url
                    });
                  });
               });
  }

  makeUrl(str: string, url?: string) {
    const params: string = [
      `part=snippet`,
      `type=video`,
      `maxResults=10`,
      `q=${str}`,
      `key=${KEY}`
    ].join(`&`);
    return `${url || API_URL}?${params}`;
  }
}
