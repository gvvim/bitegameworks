export class Dropdown {
    optionElements: HTMLElement[];
    optionsHolder: HTMLElement;

    dropdown: HTMLElement;
    options: Option[];
    hasFocus: boolean = false;
    selectedId: number = 0;

    public constructor(dropdown: HTMLElement, options: (Option | { label: string, value: any })[], onChange?: (index: number, value?: any) => void) {
        this.dropdown = dropdown;
        this.options = options;

        this.optionsHolder = <HTMLElement>this.dropdown.getElementsByClassName('dropdown-options')[0];
        this.optionsHolder.innerHTML = '';

        this.optionElements = [];
        this.options.forEach((option, index) => {
            const newEl = document.createElement('div');

            if (index == this.selectedId)
                newEl.classList.add('selected');

            newEl.classList.add('dropdown-option');
            newEl.innerText = option.label;
            newEl.addEventListener('click', () => {
                this.select(index);
                if (onChange) onChange(index, option.value);
            });
            this.optionsHolder.appendChild(newEl);
            this.optionElements.push(newEl);
        });

        this.dropdown.addEventListener('click', (event) => {
            this.toggle();
            event.stopPropagation();
        });

        window.addEventListener('click', () => {
            if (this.hasFocus) this.toggle();
        });
    }

    select(id: number) {
        this.optionElements.forEach(option => {
            option.classList.remove('selected');
        });

        this.optionElements[id].classList.add('selected');
        this.selectedId = id;
    }

    selectValue(value: any) {
        this.optionElements.forEach(option => {
            option.classList.remove('selected');
        });


        this.options.forEach((option, index) => {
            if (option.value == value) {
                this.optionElements[index].classList.add('selected');
                this.selectedId = index;
            }
        });
    }

    toggle() {
        if (this.hasFocus) {
            this.hasFocus = false;
            this.dropdown.classList.remove('dropdown-focused');

        } else {
            this.hasFocus = true;
            this.dropdown.classList.add('dropdown-focused');
        }
    }
}

export class Option {
    label: string;
    value: any;
    constructor(label: string, value: any) {
        this.label = label;
        this.value = value;
    }
}