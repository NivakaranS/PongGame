

const http = require('http');

const io = require('socket.io');


const apiServer = require('./api');
const httpServer = http.createServer(apiServer);


const socketServer = io(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
}); 
// attaching the socket.io to the server that was just created

const sockets = require('./sockets');

const PORT = 3000;

server.listen(PORT);
console.log(`Server listening on port ${PORT}...`);

sockets.listen(socketServer);


