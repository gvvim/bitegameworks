export class Templates {
    public notifications = {
        info: async (id: number, message: string) => {
            const text = loadWithParams('notifications/info.html',
                [
                    ['@@id', id.toString()],
                    ['@@text', message],
                ]
            );
            return createElement(await text);
        },
        warning: async (id: number, message: string) => {
            const text = loadWithParams('notifications/warning.html',
                [
                    ['@@id', id.toString()],
                    ['@@text', message],
                ]
            );
            return createElement(await text);
        },
        action: async (id: number, message: string) => {
            const text = loadWithParams('notifications/action.html',
                [
                    ['@@id', id.toString()],
                    ['@@text', message],
                ]
            );
            return createElement(await text);
        }
    }
}

const TemplateFactory = new Templates();
export default TemplateFactory;

const fileCache: Record<string, string> = {};

export async function loadHtml(file: string) {
    if (Object.keys(fileCache).includes(file)) {
        return fileCache[file];
    } else {
        const response = await fetch(file);
        const fileData = await response.text();
        fileCache[file] = fileData;
        return fileData;
    }
}

export async function loadWithParams(file: string, params: [string, string][]) {
    var text = (await loadHtml(file)).toString();
    params.forEach((param) => {
        text = text.replaceAll(param[0], param[1]);
    });
    return text;
}

export function createElement(innerHTML: string) {
    const element = document.createElement('div');
    element.insertAdjacentHTML('beforeend', innerHTML);
    return element;
}