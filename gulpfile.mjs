import gulp from 'gulp'
const { parallel, watch: gulpWatch } = gulp

// Pull in each task
import fonts from './tasks/fonts.mjs'
import images from './tasks/images.mjs'
import includes from './tasks/includes.mjs'
import blogs from './tasks/blogs.mjs'

// Set each directory and contents that we want to watch and
// assign the relevant task. `ignoreInitial` set to true will
// prevent the task being run when we run `gulp watch`, but it
// will run when a file changes.
const watcher = () => {
    gulpWatch('./html/**/*', { ignoreInitial: true }, includes)
    // gulpWatch('./src/images/**/*', { ignoreInitial: true }, images)
    // gulpWatch('./src/scss/**/*.scss', { ignoreInitial: true }, sass)
}

// The default (if someone just runs `gulp`) is to run each task in parallel
// export default parallel(fonts)
export default parallel(fonts, images, includes, blogs)

// This is our watcher task that instructs gulp to watch directories and
// act accordingly
export const watch = watcher