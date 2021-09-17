import * as http from 'http'
import { Server } from 'socket.io';

export const configureIoServer = (httpServer: http.Server) => {
    let countDown = 0;
    let intervalId: NodeJS.Timer;
    const io = new Server(httpServer);
    io.on('connection', (socket) => {
        console.log('Someone connected :(');
        socket.on('disconnect', () => {
            console.log('Someone disconnected :)');
        });
    
        socket.on('chat message', (msg) => {
            console.log(`Person said ${msg}`);
            if (msg == 'start game') {
                countDown = 10;
                let localId = intervalId = setInterval(() => {
                    io.emit('chat message', --countDown);
    
                    if (countDown === 0) {
                        clearInterval(localId);
                        io.emit('game over');
                    }
                }, 1000)
            } else if (msg == 'stop game') {
                intervalId && clearInterval(intervalId);
            }
    
            io.emit('chat message', `${socket.id} - ${msg}`);
        });
    });
};
