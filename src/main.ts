import 'material-icons/iconfont/material-icons.css';
// Import element definition
// @ts-ignore no type definitions
import ZeroMd from 'zero-md'
// Register custom element
customElements.define('zero-md', ZeroMd)

import Navbar from "./components/Navbar";
// import { Dropdown, Option } from "./components/Dropdown";
// import Searchbar from "./components/Searchbar";
import { Notifications } from "./Notifications";
import Blogs from "./Blogs";
import Embeds from './Embeds';
import ImageViewer from './ImageViewer';

export { }

function init() {
    const root = document.getElementById('notifications-root')!;
    Notifications.root = root;
    
    new Navbar();
    new Blogs();
    new Embeds();
    new ImageViewer();

    // Test notifs
    /*let z = 0;

    setInterval(() => {
        switch (z % 3) {
            case 0:
                new Info('Info Notification ' + z);
                break;
            case 1:
                new Info('Warning Notification ' + z, true);
                break;
            case 2:
                new Action('Action Notification ' + z, () => { });
                break;
            default:
                break;
        }

        z++;

    }, 1000);*/
}

init();
// window.document.body.onload = init; // this adds a noticeable delay to routing