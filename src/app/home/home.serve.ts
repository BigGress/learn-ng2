import { Http, RequestOptionsArgs } from "@angular/http";
import { Injectable } from "@angular/core";

import {URLSearchParams} from "@angular/http";

let params: URLSearchParams = new URLSearchParams();
params.set("client", "gtx");
params.set("sl", "auto");
params.set("dt", "t");
params.set("dj", "1");
params.set("srouce", "input");

@Injectable()
export class HomeService {
    baseUrl: string = "https://translate.googleapis.com/translate_a/single";

    constructor(
        private http: Http
    ) {

    }

    sendSourceStr(value: string, sourceKey: string = "zh-CN", targetKey: string = "en") {
        params.set("hl", sourceKey);
        params.set("tl", targetKey);
        params.set("q", value);

        console.log(params)

        return this.http.get(this.baseUrl, {
            search: params,
        })
    }
}
