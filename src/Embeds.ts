export default class Blogs {
    constructor() {
        const youtubeEmbeds = document.getElementsByClassName("youtube-embed")!;
        // Lazyly load embeds only when the user clicks on them
        // Otherwise load times go through the roof
        for (let i=0; i<youtubeEmbeds.length; i++) {
            const embed = youtubeEmbeds[i];
            const asImg = <HTMLImageElement>(embed.querySelector('img'));
            if (asImg == null) return; // only replacing image elements
            console.log("[", asImg.alt, "]");

            embed.addEventListener("click", () => {
                const iframe = document.createElement("iframe");
                iframe.className = "youtube-embed";
                iframe.title = "YouTube video player";
                iframe.referrerPolicy = "strict-origin-when-cross-origin";
                iframe.allowFullscreen = true;
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                // get the url from the img alt text
                iframe.src = asImg.alt;
                embed.replaceWith(iframe);
                // There must be some some parameters already 
                // but for us it should already be ?origin=bitegameworks.net anyways so we don't check
                iframe.src += "&autoplay=1";
            });
        }

        // Load itch embeds when the user hovers over them
        const itchEmbeds = document.getElementsByClassName("itch-embed")!;
        for (let i=0; i<itchEmbeds.length; i++) {
            const embed = itchEmbeds[i];
            const asImg = <HTMLImageElement>(embed.querySelector('img'));
            console.log(asImg);
            if (asImg == null) return; // only replacing image elements

            embed.addEventListener("mouseover", () => {
                const iframe = document.createElement("iframe");
                iframe.className = "itch-embed";
                iframe.title = "Itch.io";
                iframe.referrerPolicy = "strict-origin-when-cross-origin";
                // get the url from the img alt text
                iframe.src = asImg.alt;
                embed.replaceWith(iframe);
            });
        }
    }
}