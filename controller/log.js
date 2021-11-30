const fs = require('fs');
const date= require('date-and-time');

const logger = (subfolder, message) => {
    const now = new Date();
    const folder = `./logs/${subfolder}}`;
    const filename = date.format(now, 'YYYYMMDDHHmmSSS');
    // const json_data = JSON.stringify({ txt: "Hey there!" });

    try {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }

        fs.writeFile(`${folder}/${filename}.txt`, message, function (err) {
            if (err) return console.log(err);
        });
    } catch (err) {
        console.error(err)
    }
}
// logger();

module.exports = logger;
