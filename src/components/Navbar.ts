import { animate, lerp, updateURL } from "../util";

export default class Navbar {
    buttons: HTMLElement[];
    pages: HTMLElement[];
    wallpapers: HTMLElement[];
    tracker: HTMLElement;

    lastIndex: number = 0;

    readonly routes = ['/', '/blogs', '/about_us'];

    public constructor() {
        const mainPage = document.getElementById("main")!;

        this.buttons = [...mainPage.getElementsByClassName('navbar-buttons')[0].getElementsByTagName('button')];
        this.pages = <HTMLElement[]>[...mainPage.querySelector(".content")!.getElementsByClassName('page')];
        this.wallpapers = <HTMLElement[]>[...document.body.querySelector(".wallpapers")!.getElementsByClassName('wallpaper')];
        this.tracker = <HTMLElement>mainPage.querySelector('.navtracker');

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
        // console.log(page);
        switch(page) {
            case this.routes[0]:
            case '/home':
                this.setSelected(0);
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
            const wallpaper = this.wallpapers[i];

            if (i == index) {
                wallpaper.style.opacity = `1`;
            } else {
                wallpaper.style.opacity = `0`;
            }
        });

        this.lastIndex = index;
    }

    navSelect(index: number, time = 30) {
        if (this.lastIndex == index) return;
        
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
        
        const lastIndex = this.lastIndex;
        // const pages = [...document.getElementById("content").getElementsByClassName("page")];
        this.pages.forEach((element, i) => {
            const wallpaper = this.wallpapers[i];

            let lastPosition = parseInt(element.style.left);
            if (isNaN(lastPosition)) {
                lastPosition = (100 * i);
            }
            animate((t) => {
                const newValue = lerp(lastPosition, (100 * (i - index)), t);
                element.style.left = newValue + '%';
            }, time);
            
            animate((t) => {
                if (i == lastIndex) {
                    wallpaper.style.opacity = `${1.0 - t}`;
                } else if (i == index) {
                    wallpaper.style.opacity = `${t}`;
                }
            }, time * 2.0);
        });

        this.lastIndex = index;
    }
}