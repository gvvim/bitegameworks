export default class Searchbar {
    input: HTMLInputElement;
    clear: HTMLElement;
    label: HTMLElement;

    data: any[];
    searchProperties: string[];
    keyProperty: string;
    update: (visibleIds: number[]) => void;

    public constructor(input: HTMLInputElement, label: HTMLElement, clear: HTMLElement, data: any[], keyProperty: string, searchProperties: string[], update: (visibleKeys: any[]) => void) {
        this.input = input;
        this.clear = clear;
        this.label = label;

        this.data = data;
        this.keyProperty = keyProperty;
        this.searchProperties = searchProperties;
        this.update = update;

        this.hide(this.clear);

        this.input.addEventListener('focus', () => {
            this.hide(this.label);
            this.show(this.clear);
        });

        this.clear.addEventListener('click', () => {
            this.input.value = '';
            this.show(this.label);
            this.hide(this.clear);

            this.search('');
        });

        this.input.addEventListener('input', () => {
            this.search(this.input.value);
        });
    }

    private search(searchTerm: string) {
        const found: number[] = [];
        searchTerm = searchTerm.toLowerCase();

        for (let i = 0; i < this.data.length; i++) {
            const item = this.data[i];
            this.searchProperties.forEach(property => {
                if (!found.includes(item[this.keyProperty])) {
                    if (item[property].toLowerCase().includes(searchTerm)) {
                        found.push(item[this.keyProperty]);
                    }
                }
            });
        }
        this.update(found);
    }

    private show(element: HTMLElement) {
        element.style.display = 'inline';
    }

    private hide(element: HTMLElement) {
        element.style.display = 'none';
    }

    //TODO
}