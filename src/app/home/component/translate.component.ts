import {
    Component,
    Input,
    trigger,
    transition,
    style,
    state,
    animate,
    OnChanges,
} from "@angular/core";

@Component({
    selector: "translate",
    template: require("./translate.component.html"),
    animations: [
        trigger("toggle", [
            state("hide", style({
                height: `0rem`,
            })),
            state("show", style({
                height: `5rem`,
            })),
            transition(`hide => show`, animate(`200ms ease-in`)),
            transition(`show => hide`, animate(`200ms ease-out`))
        ])
    ],
    styles: [`
        .translate {
            overflow: hidden;
        }
    `]
})
export class translateComponent implements OnChanges{
    @Input() data;

    sentences: any[] = [];

    state: string = "hide";

    constructor() {}

    ngOnChanges() {
        if (this.data) {
            this.state = "show";

            this.sentences = this.data.sentences;
        }
    }

    toggle() {
        if (this.state === "hide") {
            this.state = "show";
        } else {
            this.state = "hide";
        }
    }
}
