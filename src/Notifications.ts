import TemplateFactory from "./Templates";

export class Notifications {
    static root: HTMLElement;
    static currentIndex = 0;

    public static autoIncrement() {
        const index = Notifications.currentIndex;
        Notifications.currentIndex++;
        return index;
    }
}

export class Info {
    element!: HTMLElement;
    message: string;

    private initialized: boolean = false;

    id: number;

    public constructor(message: string, warning: boolean = false) {
        this.initialized = false;
        this.message = message;
        this.id = Notifications.autoIncrement();
        this.initialize(warning);
    }

    private async initialize(warning: boolean) {
        if (warning) {
            this.element = await TemplateFactory.notifications.warning(this.id, this.message);
        } else {
            this.element = await TemplateFactory.notifications.info(this.id, this.message);
        }
        Notifications.root.appendChild(this.element);
        this.initialized = true;

        const closeButton = this.element.querySelector('#notification-close-' + this.id);
        closeButton?.addEventListener('click', () => {
            this.destroy();
        });
        if (warning) {
            console.warn('[warning]:', this.message);
        } else {
            console.log('[info]:', this.message);
        }

        setTimeout(() => this.destroy(), 7500);
    }

    public destroy() {
        if (this.initialized)
            this.element.remove();
    }
}

export class Action {
    element!: HTMLElement;
    message: string;
    undoFunc: Function;

    private initialized: boolean = false;

    id: number;

    public constructor(message: string, undoFunc: Function) {
        this.initialized = false;
        this.message = message;
        this.id = Notifications.autoIncrement();
        this.undoFunc = undoFunc;
        this.initialize();
    }

    private async initialize() {
        this.element = await TemplateFactory.notifications.action(this.id, this.message);
        Notifications.root.appendChild(this.element);
        this.initialized = true;

        const closeButton = this.element.querySelector('#notification-close-' + this.id)!;
        closeButton.addEventListener('click', () => {
            this.destroy();
        });

        const undoButton = this.element.querySelector('#notification-undo-' + this.id)!;
        undoButton.addEventListener('click', () => {
            this.undoFunc();
            console.log('[undone]:', this.message);
            this.destroy();
        });

        console.log('[action]:', this.message);

        setTimeout(() => this.destroy(), 7500);
    }

    public destroy() {
        if (this.initialized)
            this.element.remove();
    }
}