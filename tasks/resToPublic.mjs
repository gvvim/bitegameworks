import fs from 'fs';

const resToPublic = () => {
    console.log(`[GULP-TASK] copy res files to public folder`);
    return new Promise(function (resolve, reject) {
        // get all filepaths in folder /res/ and copy them to /public/
        fs.cpSync('res', 'public', { recursive: true });
        resolve();
    });
}

export default resToPublic;