import { animate, lerp } from "../../src/util";

export default class ChildPage {

    childPage: HTMLElement;
    parentPage: HTMLElement;

    public constructor(childPage: HTMLElement, parentPage: HTMLElement) {
        this.childPage = childPage;
        this.parentPage = parentPage;
    }

    open() {
        animate((t) => {
            const newValue = lerp(100, 0, t);
            this.childPage.style.top = newValue + '%';
        }, 25);
    }

    close() {
        animate((t) => {
            const newValue = lerp(0, 100, t);
            this.childPage.style.top = newValue + '%';
        }, 25);
    }
}

