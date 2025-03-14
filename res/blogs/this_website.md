# About this website

<info>
	<title>This website</title>
	<author>Gwim</author>
	<date>2025-03-18</date>
	<type>tutorial</type>
	<thumbnail>/bitelogo.png</thumbnail>
	<confetti>false</confetti>
</info>

If you have a fast internet connection you might have noticed that the website makes good use of it. It loads very fast.

![load time](/images/load_time.jpg)

This is in great part due to how lightweight it is, but also due to some optimizations which I'll discuss here.

If you're a web developer and this interests you, and you've looked at the dev tools, you'll notice that the code for the website is minified, but don't worry, we've made the source code available on [on github](https://github.com/gvvim/bitegameworks).

If you're also a game developer and need a website feel free to use it as a template! Only basic html editing skills are needed.

## How does it work

I initially started making this template a few years ago for a different project, and my main goal back then was to explore making a full app without relying on a framework.
I've always felt that frameworks overcomplicated web development and I think a lot of people can agree with that, however there's obviously value in the features that frameworks provide, with the major one being the use of typescript.

So what I settled on was using [Vite](https://vite.dev/) to bundle and convert the typescript source into a static site  (originally I used snowpack, but it's become outdated and hasn't received any updates in a long time). Vite doesn't cover everything we might need to do before exporting our site, so we use [gulp](https://gulpjs.com/) to create tasks to do it.
To avoid gulp overriding files in the *public* folder vite serves resources from (and vice versa), we create a *res* folder, and generate the public folder from that.
One example of some gulp tasks that optimize the website is the use of the [get-google-fonts](https://www.npmjs.com/package/get-google-fonts) package which predownloads the fonts we use so the page doesn't need to wait for any external resources to load, and there is no issue of the wrong font being loaded for a few frames the first time the user visits the site, before the font gets cached. We also use [imagemin](https://www.npmjs.com/package/imagemin) to optimize all the images on the site, reducing their file size and thus, load time.

Another important feature that react and angular offer, is being able to write html as partials. But the [gulp-file-include](https://www.npmjs.com/package/gulp-file-include) package can do this. So now we have most of the features we need without being overwhelmed or bogging down the.

The site doesn't reload the page when navigating, this is because the whole site is actually a single page the navbar animates through javascript. Though this means we need to handle routing manually and set up the hosting server to redirect 404s to the index page (in our case NGINX), I'd say it's worth it for those smooth transition animations. 

## About this blog

This blog was written in markdown, which we render here using [zero-md](https://zerodevx.github.io/zero-md/). The blogs are loaded dynamically by reading a `blogs.json` file in the website's public folder, and this file is kept updated by a script. This lets us avoid having to use a database to store data that is already on the frontend. Any additional data about a blog is placed in the .md file itself and is extracted by the script, it looks something like this:

```xml
<info>
	<title>This website</title>
	<author>Gwim</author>
	<date>2025-03-09</date>
	<type>tutorial</type>
	<thumbnail>bitelogo.png</thumbnail>
	<confetti>false</confetti>
</info>
```

The info tag is hidden from the preview through css. The confetti tag just tells the script to create some confetti upon opening that blog (using [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)), it's for celebrating release announcements.

## Planned features

Sometime before starting on our next game, we'll be updating the website with a **Games** page, which will list all of our games. For now, it's just **Rust and Ruin** on the homepage.

## Some issues

- Since navigation is animated through javascript the site doesn't work with scripts disabled.

- On Firefox the transition animations are slower.

## Feedback

If you want to know more or give feedback, you're welcome to join our discord server: https://discord.gg/QJZjb7jrPu

Thanks for reading!