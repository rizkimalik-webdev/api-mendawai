const date= require('date-and-time');
const downloader = require('./config/downloader');
const now = new Date();

console.log(date.format(now, 'YYYYMMDDHHmmSSS'));

downloader('https://laravel.com/img/logomark.min.svg','test', 'logomark.png');