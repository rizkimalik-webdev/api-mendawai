"use strict";
const path = require('path');
const util = require('util');
const fs = require('fs');

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
        const url = `${directory + md5 + extension}`;

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

module.exports = { upload, read }