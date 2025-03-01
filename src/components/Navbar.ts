import { animate, lerp } from "../../src/util";

export default class Navbar {
    buttons: HTMLElement[];
    pages: HTMLElement[];
    tracker: HTMLElement;

    public constructor(buttons: HTMLElement[], pages: HTMLElement[], tracker: HTMLElement) {
        this.buttons = buttons;
        this.pages = pages;
        this.tracker = tracker;

        const trackerOffset = (100 * (0.5 / this.buttons.length));
        this.tracker.style.left = trackerOffset + '%';

        this.pages.forEach((element, index) => {
            element.style.left = (100 * index) + '%';
        });

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].onclick = () => this.navSelect(i);
        }
    }

    navSelect(index: number) {
        // Update 'selected' button
        const navButtons = this.buttons;
        navButtons.forEach(element => {
            element.className = 'navbutton';
        });
        navButtons[index].className = 'navbutton selected';

        const n = navButtons.length;

        // Update tracker position (lerp over time)
        const trackerOffset = (100 * (index / n + 0.5 / n));
        const tracker = this.tracker;
        let lastOffset = parseInt(tracker.style.left);
        if (isNaN(lastOffset)) {
            lastOffset = (100 * (0 / n + 0.5 / n));
        }

        animate((t) => {
            const newValue = lerp(lastOffset, trackerOffset, t);
            tracker.style.left = newValue + '%';
        }, 50);

        // const pages = [...document.getElementById("content").getElementsByClassName("page")];
        this.pages.forEach((element, i) => {
            let lastPosition = parseInt(element.style.left);
            if (isNaN(lastPosition)) {
                lastPosition = (100 * i);
            }
            animate((t) => {
                const newValue = lerp(lastPosition, (100 * (i - index)), t);
                element.style.left = newValue + '%';
            }, 50);
        });
    }
}