import {
    Component,
    Input,
    OnChanges,
    OnInit,
    ViewChild,
    ElementRef,
    Renderer,
} from "@angular/core";

import {
    Http,
    Response,
} from "@angular/http";

@Component({
    selector: "svg-icon",
    template: `
    <div #svgDom></div>
    `,
})
export class SvgIconComponent implements OnChanges,OnInit{
    @Input() url;

    @ViewChild("svgDom") dom: ElementRef;

    constructor(
        private http: Http,
        private render: Renderer
    ) {
        console.log(this.render);


    }

    ngOnInit() {
        console.log(this.url);
        console.log(this.dom);
    }

    ngOnChanges() {
        if (this.url) {
            this.getIcon();
        }
    }

    /**
     * 获取icon
     */
    getIcon() {
        this.http.get(this.url)
            .subscribe((e: Response) => {
                this.dom.nativeElement.innerHTML = e.text();
            })
    }
}
