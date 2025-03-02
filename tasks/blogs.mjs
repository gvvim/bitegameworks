import fs from 'fs';
import path from 'path';

const blogs = () => {
    console.log(`[GULP-TASK] update blogs list`);
    return new Promise(function (resolve, reject) {
        // get all filepaths in folder /blogs/ ending in .md and write them to blogs.json
        const blogs = fs.readdirSync('res/blogs').filter(file => file.endsWith('.md')).map(file => path.join('/blogs', file));
        fs.writeFileSync('public/blogs.json', JSON.stringify({ blogs }));
        resolve();
    });
}

export default blogs;