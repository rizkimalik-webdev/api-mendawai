const express = require('express')
const http = require('http');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3001;

dotenv.config();
express.application.prefix = express.Router.prefix = function (path, configure) {
    const router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
}

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

// const io = require('socket.io')(server, {
//     cors: {
//         origin: [
//             'http://localhost:3000',
//             'http://localhost:5000', 
//             'https://main.d9bnubwqkpgf8.amplifyapp.com',
//             'https://app-mendawai.netlify.app'
//         ],
//         methods: ["GET", "POST", "PUT", "DELETE"]
//     }
// });

//?parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static(`./${process.env.DIR_ATTACHMENT}`));

// app.use(cookieParser());
// app.use(cors({
//     credentials: true,
//     origin: ['http://localhost:3000'],
// }));

//? routes api endpoint
const api = require('./routes/api');
api(app);

//? routes socket endpoint
const socket = require('./routes/socket');
socket(io);

server.listen(port, () => {
    console.log(`✨ Server app listening at port : 🚀 http://localhost:${port}`)
})
