import { animate, lerp, updateURL } from "../util";

export default class Navbar {
    buttons: HTMLElement[];
    pages: HTMLElement[];
    tracker: HTMLElement;

    readonly routes = ['/', '/blogs', '/about_us'];

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

        // read route from URL and set initial page
        const page = window.location.pathname;
        console.log(page);
        switch(page) {
            case this.routes[0]:
            case '/home':
                break;
            case this.routes[1]:
                this.setSelected(1);
                break;
            case this.routes[2]:
                this.setSelected(2);
                break;
        }
    }

    setSelected(index: number) {
        const navButtons = this.buttons;
        navButtons.forEach(element => {
            element.className = 'navbutton';
        });
        navButtons[index].className = 'navbutton selected';

        const n = navButtons.length;

        // Update tracker position (lerp over time)
        const trackerOffset = (100 * (index / n + 0.5 / n));
        const tracker = this.tracker;

        tracker.style.left = trackerOffset + '%';

        // const pages = [...document.getElementById("content").getElementsByClassName("page")];
        this.pages.forEach((element, i) => {
            const newValue = 100 * (i - index);
            element.style.left = newValue + '%';
        });
    }

    navSelect(index: number, time = 30) {
        // Update 'selected' button
        updateURL(this.routes[index]);
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
        }, time);

        // const pages = [...document.getElementById("content").getElementsByClassName("page")];
        this.pages.forEach((element, i) => {
            let lastPosition = parseInt(element.style.left);
            if (isNaN(lastPosition)) {
                lastPosition = (100 * i);
            }
            animate((t) => {
                const newValue = lerp(lastPosition, (100 * (i - index)), t);
                element.style.left = newValue + '%';
            }, time);
        });
    }
}