var Service = require('node-windows').Service;
require('dotenv').config();

// Create a new service object
var svc = new Service({
    name: process.env.APP_NAME,
    description: 'Api web server.',
    script: require('path').join(__dirname, 'app.js')
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
    svc.start();
});

svc.install();