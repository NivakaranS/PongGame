
let readyPlayerCount = 0;

function listen(io) {
    
    const pongNamespace = io.of('/pong');

    pongNamespace.on('connection', (socket) => {
        let room;

        console.log('A user connected', socket.id);

        socket.on('ready', () => {
            room = 'room' + Math.floor(readyPlayerCount/2);
            socket.join(room);
            console.log("Player is ready", socket.id, room)

            readyPlayerCount++;

            if(readyPlayerCount % 2=== 0) {
                pongNamespace.in(room).emit('startGame', socket.id);
                //When we choose socket.id, we are choosing the 2nd player who emitted ready as the referee
            }
        })

        socket.on('paddleMove', (data) => {
            socket.to(room).emit('paddleMove', data);
        })

        socket.on('ballMove', (data) => {
            socket.to(room).emit('ballMove', data);
        })

        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected: ${reason}`);
            socket.leave(room);
        })
    })

}

module.exports = {
    listen  
}