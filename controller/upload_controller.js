"use strict";
const path = require('path');
const util = require('util');
const fs = require('fs');
const logger = require('../helper/logger');


const UploadAttachment = async function (attachment,file_name, file_size) {
    try {
        const extension = path.extname(file_name);
        const directory = `./${process.env.DIR_ATTACHMENT}/`;
        const allowedExtensions = /png|jpeg|jpg|gif|svg|pdf|xls|xlsx|doc/;

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
        if (!allowedExtensions.test(extension)) throw "Invalid File type";
        if (file_size > 3000000) throw "max file 3MB";
        // const md5 = file.md5;
        // const url = `${directory + md5 + extension}`;
        const url = `${directory + file_name}`;

        fs.writeFile(url, attachment, function(err) {
            if(err) {
                return console.log(err);
            }
        }); 

        return url;
    } catch (error) {
        console.log(error)
        logger('upload/UploadAttachment', error);
    }
}

const upload = async function (req, res) {
    try {
        const file = req.files.file;
        const name = file.name;
        const size = file.size;
        const extension = path.extname(name);
        const directory = `./${process.env.DIR_ATTACHMENT}/`;
        const allowedExtensions = /png|jpeg|jpg|gif/;
        console.log(file)

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        if (!allowedExtensions.test(extension)) throw "Invalid File type";
        if (size > 5000000) throw "max file 5MB";
        const md5 = file.md5;
        // const url = `${directory + md5 + extension}`;
        const url = `${directory + name}`;

        await util.promisify(file.mv)(url);

        res.json({ message: 'success upload' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}

const read = async function (req, res) {
    try {
        const directory = `./${process.env.DIR_ATTACHMENT}/`;
        fs.readdir(directory, (err, files) => {
            if (err) return console.log(err);
            files.forEach(file => {
                // console.log(file);
                res.json({ message: file });
            });
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}

module.exports = { UploadAttachment, upload, read }