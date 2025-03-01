import gulp from 'gulp';
import fileinclude from 'gulp-file-include';

const includes = () => {
    console.log(`[GULP-TASK] include partial html`);
    return gulp.src(['html/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './html'
        }))
        .pipe(gulp.dest('./'));
}

export default includes;