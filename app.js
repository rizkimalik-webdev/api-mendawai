const fs = require('fs');
const http = require('http');
const https = require('https');
const cors = require('cors');
const express = require('express')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const port_http = process.env.PORT || 3001;
const port_https = process.env.PORT || 3500;

const credentials = {
    key: fs.readFileSync('ssl/private.key', 'utf8'),
    cert: fs.readFileSync('ssl/certificate.crt', 'utf8')
}

dotenv.config();
express.application.prefix = express.Router.prefix = function (path, configure) {
    const router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
}

const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
const io = require('socket.io')(httpServer, {
    cors: {
        // origin: ['https://app.mendawai.com'],
        origin: '*',
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

//?parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
app.use('/attachment', express.static('./' + process.env.DIR_ATTACHMENT));

// app.use(cookieParser());
// app.use(cors({
//     credentials: true,
//     origin: ['https://app.mendawai.com'],
// }));

//? routes api endpoint
const api = require('./routes/api');
api(app);

//? routes socket endpoint
const socket = require('./routes/socket');
socket(io);

//? routes blending
const blending = require('./routes/blending');
blending(app, io);

httpServer.listen(port_http, () => console.log(`http://localhost:${port_http}`));
httpsServer.listen(port_https, () => console.log(`https://localhost:${port_https}`));

