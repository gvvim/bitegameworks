import GetGoogleFonts from 'get-google-fonts'

const fonts = async () => {
    console.log(`[GULP-TASK] predownload google fonts`);
    // Setup of the library instance by setting where we want
    // the output to go. CSS is relative to output font directory

    const instance = new GetGoogleFonts({
        outputDir: 'css/fonts/',
        cssFile: './fonts.css',
    })

    // Grabs fonts and CSS from google and puts in the dist folder
    const result = await instance.download(
        [
            {
                'Bebas Neue': [400, 500, 600, 700]
            },
            ['cyrillic']
        ]
    )

    return result
}

export default fonts