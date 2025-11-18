export function lerp(a: number, b: number, t: number) {
    return t * b + (1 - t) * a;
}

export function animate(anim: (t: number) => void, duration: number, andThen?: () => {}) {
    let i = 0;
    const timer = setInterval(() => {
        if (i > duration) {
            clearInterval(timer);
            if (andThen)
                andThen();
        } else {
            const t = i / duration;
            anim(t);
            i += 1;
        }
    }, 1);
}

export function clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
}

export function objectsIdentical(obj1: any, obj2: any) {
    return (Object.keys(obj1) as (keyof typeof obj1)[]).every((key) => {
        return (
            Object.prototype.hasOwnProperty.call(obj2, key) && obj1[key] === obj2[key]
        );
    });
}

export function shadeColor(color: string, percent: number) {

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt('' + R * (100 + percent) / 100);
    G = parseInt('' + G * (100 + percent) / 100);
    B = parseInt('' + B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

export function readTag(text: string, tag: string) {
    const foundTag = text.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`, "s"))!;
    if (foundTag != null) {
        return foundTag[0].replace(`<${tag}>`, "").replace(`</${tag}>`, "");
    }
    return null;
}

export async function asyncForEach<T>(array: Array<T>, callback: (item: T, index: number) => Promise<void>) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index);
    }
}

export function updateURL(url: string) {
    window.history.replaceState({ additionalInformation: 'Updated the URL with JS' },'', url);
}