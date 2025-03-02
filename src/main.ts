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

export { }

function init() {
    const root = document.getElementById('notifications-root')!;
    Notifications.root = root;
    
    const mainPage = document.getElementById("main")!;
    new Navbar(
        [...mainPage.getElementsByClassName('navbar-buttons')[0].getElementsByTagName('button')],
        <HTMLElement[]><any>[...mainPage.querySelector(".content")!.getElementsByClassName('page')],
        mainPage.querySelector('.navtracker')!
    );

    new Blogs();
    // const projectsSearch = new Searchbar(
    //     <HTMLInputElement>document.getElementById('search-projects'),
    //     document.getElementById('search-projects-label')!,
    //     document.getElementById('search-projects-clear')!,
    //     myProjects,
    //     'id',
    //     ['title', 'description'],
    //     (visibleKeys: any[]) => {
    //         myProjects.forEach(project => {
    //             const element = listProjects.querySelector('#project-' + project.id)!.parentElement!;
    //             if (!visibleKeys.includes(project.id)) {
    //                 element.classList.add('hide');
    //             } else {
    //                 element.classList.remove('hide');
    //             }
    //         });
    //     }
    // );

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