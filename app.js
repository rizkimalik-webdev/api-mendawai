const express = require('express')
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
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
        origin : ['http://localhost:3000', 'https://admin.socket.io', 'https://hoppscotch.io'],
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

//?parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//? routes endpoint
const routes = require('./routes')
routes(app);


//? sockets endpoint
const sockets = require('./routes/sockets')
sockets(io);

server.listen(port, () => {
    console.log(`Server app listening at port : http://localhost:${port}`)
})