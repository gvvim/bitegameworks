import confetti from 'canvas-confetti';
import ChildPage from "./components/ChildPage";
import { asyncForEach, readTag } from './util';
import Searchbar from './components/Searchbar';

class Blog {
    constructor(
        public id: number,
        public title: string, 
        public author: string, 
        public type: string, 
        public date: Date, 
        public url: string, 
        public content: string,
        public thumbnail: string = "/images/missing_texture.png", 
        public confetti: boolean = false,
    ) {}
}

export default class Blogs {

    private mdView: Element;
    private aboutType: Element;
    private aboutAuthor: Element;
    private aboutDate: Element;
    private blogPage: ChildPage;

    constructor() {
        const blogPageElement = document.getElementById('blog-page')!;
        
        this.blogPage = new ChildPage(
            blogPageElement,
            <HTMLElement>blogPageElement.parentElement!.getElementsByClassName('page-parent')[0]
        );
        
        document.getElementById('blog-back')?.addEventListener('click', () => {
            this.blogPage.close();
        });

        this.mdView = this.blogPage.childPage.querySelector('zero-md')!;
        this.aboutType = this.blogPage.childPage.querySelector('#blog-about-type')!;
        this.aboutAuthor = this.blogPage.childPage.querySelector('#blog-about-author')!;
        this.aboutDate = this.blogPage.childPage.querySelector('#blog-about-date')!;
        this.updateBlogsPage();
        // blogPage.open();
    }

    async getBlogUrls() {
        const response = await fetch("/blogs.json");
        const json = await response.json();
        return json;
    }

    lastId = 0;
    
    async getBlog(blogUrl: string) {
        const response = await fetch(blogUrl);
        const text = await response.text();
        const info = readTag(text, 'info')!;
        const content = text.replace(info, "");
        const title = readTag(info, 'title')!;
        const author = readTag(info, 'author')!;
        const type = readTag(info, 'type')!;
        const date = new Date(readTag(info, 'date')!);
        let thumbnail = readTag(info, 'thumbnail')!;
        if (thumbnail == null) {
            thumbnail = '/images/missing_texture.png';
        }
        const confetti = readTag(info, 'confetti') === "true";
        
        const blog = new Blog(this.lastId, title, author, type, date, blogUrl, content, thumbnail, confetti);
        this.lastId++;
        return blog;
    }
    
    async viewBlog(blog: Blog) {
        this.mdView.setAttribute('src', blog.url);
        const type =  blog.type.toUpperCase();
        this.aboutType.innerHTML = type;
        switch(type) {
            case "TUTORIAL":
                this.aboutType.className = "blog-about-tutorial";
            break;
            case "NEWS":
                this.aboutType.className = "blog-about-news";
            break;
            default:
                break;
        }
        this.aboutAuthor.innerHTML = blog.author;
        this.aboutDate.innerHTML = blog.date.toLocaleDateString();

        if (blog.confetti) {
            confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
                resize: true,
                useWorker: true,
            })({ particleCount: 200, spread: 200 });
        }
        this.blogPage.open();
    }

    populatePreview(preview: HTMLElement, blog: Blog) {
        preview.querySelector('.blog-preview-title')!.innerHTML = blog.title;
        const typeEl = preview.querySelector('.blog-preview-type')! as HTMLElement;
        typeEl.innerHTML = blog.type;
        if (blog.type == 'tutorial') {
            typeEl.style.backgroundColor = 'var(--blog-type-tutorial)';
        } else {
            typeEl.style.backgroundColor = 'var(--blog-type-news)';
        }
        preview.querySelector('.blog-preview-date')!.innerHTML = blog.date.toLocaleDateString();
        preview.style.backgroundImage = `url(${blog.thumbnail})`;
    }
    
    async updateBlogsPage() {
        const blogUrls = await this.getBlogUrls();
        const urls = blogUrls.blogs;
    
        const blogs: Blog[] = [];
        await asyncForEach(urls, async (url: string) => {
            blogs.push(await this.getBlog(url));
        });
    
        // Blog previews
        const blogPreview1 = document.getElementById('blog-latest-1')!;
        const blogPreview2 = document.getElementById('blog-latest-2')!;
        const blogPreview3 = document.getElementById('blog-latest-3')!;
        if(urls.length > 0) {
            this.populatePreview(blogPreview1, blogs[0]);
            blogPreview1.onclick = () => {
                this.viewBlog(blogs[0]);
            };
        } else {
            blogPreview1.remove();
        }
        if(urls.length > 1) {
            this.populatePreview(blogPreview2, blogs[1]);
            blogPreview2.onclick = () => {
                this.viewBlog(blogs[1]);
            };
        } else {
            blogPreview2.parentElement?.remove();
        }
        if(urls.length > 2) {
            this.populatePreview(blogPreview3, blogs[2]);
            blogPreview3.onclick = () => {
                this.viewBlog(blogs[2]);
            };
        } else {
            blogPreview3?.remove();
        }

        // Blogs list (searchable)
        const blogsList = document.getElementById('list-blogs')!;
        blogsList.innerHTML = '';
        blogs.forEach((blog: Blog) => {
            const blogPreview = blogPreview1.cloneNode(true) as HTMLElement;
            blogPreview.id = `blog-${blog.id}`;
            this.populatePreview(blogPreview, blog);
            blogPreview.onclick = () => {
                this.viewBlog(blog);
            };
            blogsList.appendChild(blogPreview);
        });

        // Search bar
        new Searchbar(
            <HTMLInputElement>document.getElementById('search-blogs'),
            document.getElementById('search-blogs-label')!,
            document.getElementById('search-blogs-clear')!,
            blogs,
            'id',
            ['title', 'content'],
            (visibleKeys: any[]) => {
                blogs.forEach(blog => {
                    const element = blogsList.querySelector(`#blog-${blog.id}`)!;
                    if (!visibleKeys.includes(blog.id)) {
                        element.classList.add('hide');
                    } else {
                        element.classList.remove('hide');
                    }
                });
            }
        );
    }
}