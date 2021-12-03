var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name:'api_mendawai',
    description: 'Api web server.',
    script: 'D:\\laragon\\www\\applications_nodejs\\api-mendawai-cjs\\app.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
    svc.start();
});

svc.install();