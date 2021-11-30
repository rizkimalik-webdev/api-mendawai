const Downloader = require('nodejs-file-downloader');
const logger = require('./logger');

const downloader = async (url, folder, filename) => {
    const media = `./media/${folder}`;
    function onResponse(response) {
        if (response.headers['content-length'] > 1000000) {
            console.log('File is too big!')
            return false;
        }
    }

    const downloader = new Downloader({
        url: url,     
        directory: media,
        fileName: filename,             
        onResponse
    });
    
    try {
        await downloader.download();
        console.log('Download done.');
    } catch (error) {
        console.log('Download failed', error);
        logger('download', error);
    }
}

module.exports = downloader;