export default class ImageViewer {
    private viewerRoot: HTMLElement;
    private viewerContent: HTMLImageElement;

    constructor() {
        // Add viewable to image element to be able to view it in detail
        const images = document.querySelectorAll<HTMLImageElement>('.viewable');
        images.forEach(img => img.onclick = () => this.preview(img));
        console.log(images);

        this.viewerRoot = document.createElement('div');
        this.viewerRoot.className = 'viewer-root';
        document.body.appendChild(this.viewerRoot);

        this.viewerRoot.classList.add('hide');
        this.viewerRoot.onclick = () => {
            this.viewerRoot.classList.add('hide');
        };

        this.viewerContent = document.createElement('img');
        this.viewerContent.className = 'viewer-content';
        this.viewerRoot.appendChild(this.viewerContent);
    }

    preview(image: HTMLImageElement) {
        this.viewerContent.src = image.src;
        this.viewerRoot.classList.remove('hide');
    }

}