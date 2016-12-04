import {
    Component,
    ElementRef,
} from '@angular/core';

import {
    AppState
} from '../app.service';
import {
    Title
} from './title';
import {
    XLarge
} from './x-large';

import { Http } from "@angular/http";

import { HomeService } from "./home.serve";

import { languageData } from "./common/language";

import { translateComponent } from "./Component/translate.component";

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'home', // <home></home>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [
        Title,
        HomeService,
    ],
    // Our list of styles in our component. We may add more to compose many styles together
    styles: [require('./home.component.scss')],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./home.component.html')
})
export class HomeComponent {

    language: {from: string, to: string} = {
        from: "zh-CN",
        to: "en",
    }

    languageData = languageData;

    // Set our default values
    localState = {
        value: ''
    };
    needTranlstate: string = "";

    translate: any;

    bodyEl: HTMLElement = document.body;

    // TypeScript public modifiers
    // private service: HomeService = new HomeService(this.http)
    constructor(
        public appState: AppState,
        public title: Title,
        public http: Http,
        private service: HomeService,
        private element: ElementRef
    ) {

    }

    toggleFromAndTo() {
        let theFrom = this.language.from;

        this.language.from = this.language.to;
        this.language.to = theFrom;
    }

    test() {
        console.log(this.needTranlstate)
        this.service.sendSourceStr(this.needTranlstate, this.language.from, this.language.to)
            .subscribe((res) => {
                console.log(res.json());
                this.translate = res.json();

                this.bodyEl.style.height = "180px";
            })
    }

    ngOnInit() {
        console.log('hello `Home` component');
        // this.title.getData().subscribe(data => this.data = data);
    }

    submitState(value: string) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    }
}
