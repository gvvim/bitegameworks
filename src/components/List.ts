export default class List {
    itemsHolder: HTMLElement;
    templateFunction: (x: any, index: number) => HTMLElement;
    items: any[];

    public constructor(itemsHolder: HTMLElement, templateFunction: (x: any, index: number) => HTMLElement) {
        this.itemsHolder = itemsHolder;
        this.templateFunction = templateFunction;

        this.items = [];
    }

    public add(item: any) {
        this.itemsHolder.appendChild(this.templateFunction(item, this.items.length));
        this.items.push(item);
    }

    public remove(item: any) {
        const index = this.items.findIndex(item);
        this.removeAt(index);
    }

    public removeAt(index: number) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
            this.itemsHolder.removeChild(this.itemsHolder.children[index]); // test this
        }
    }

    public populate(items: any[]) {
        this.clear();

        this.items = items;

        this.items.forEach((item, index) => {
            this.itemsHolder.appendChild(this.templateFunction(item, index));
        });
    }

    public clear() {
        this.itemsHolder.innerHTML = "";
    }
}