import { clamp } from "../../src/util";

export default class Slider {
    slideHandler!: EventListener;

    onChange?: Function;
    onEnd?: Function;

    public constructor(element: HTMLElement, onChange?: Function, onEnd?: Function) {
        this.onChange = onChange;
        this.onEnd = onEnd;

        element.addEventListener('pointerdown', (event) => this.slideStart(event));
    }

    slideStart(e: MouseEvent) {
        const handle = <HTMLElement>(<HTMLElement>e.target!).children[0].children[0];

        this.slide(e, handle, this.onChange);
        this.slideHandler = (event) => {
            this.slide(<MouseEvent>event, handle, this.onChange);
        };

        window.onpointerup = () => {
            if (this.onEnd) this.onEnd();
            this.slideEnd();
            window.onpointerup = null;
        };

        window.addEventListener('pointermove', this.slideHandler);
        document.body.classList.add('grabbing');
    }

    slide(e: MouseEvent, handle: HTMLElement, valueFunc?: Function) {
        var rect = handle.parentElement!.parentElement!.getBoundingClientRect();
        var x = e.pageX - rect.left; //x position within the element.
        const offset = handle.offsetWidth / 2;
        const xPos = clamp(x, offset / 2, (rect.right - rect.left));
        handle.parentElement!.style.width = xPos + 'px';

        const value = (clamp((x - offset) / (rect.width - offset), 0.0, 1.0)).toFixed(2);
        if (valueFunc) valueFunc(value);
    }

    slideEnd() {
        window.removeEventListener('pointermove', this.slideHandler);
        document.body.classList.remove('grabbing');
    }
}