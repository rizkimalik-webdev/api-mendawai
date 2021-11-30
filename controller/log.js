const fs = require('fs');
const date= require('date-and-time');

const logger = (folder, message) => {
    const now = new Date();
    const directory = `./logs/${folder}`;
    const filename = date.format(now, 'YYYYMMDDHHmmSSS');
    // const json_data = JSON.stringify(message);

    try {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        fs.writeFile(`${directory}/${filename}.txt`, String(message), function (err) {
            if (err) return console.log(err);
        });
    } catch (err) {
        console.error(err)
    }
}
// logger();

module.exports = logger;
