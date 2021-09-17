import * as http from 'http'
import { Server } from 'socket.io';
import { configureChatClient } from './chatServer';
import { SET_NAME } from './events';
import { setName } from './gameUtils';

export const configureIoServer = (httpServer: http.Server) => {
    const io = new Server(httpServer);
    io.on('connection', (socket) => {
        configureChatClient(io, socket);
        socket.on(SET_NAME,  (name: string) => setName(socket, name))
    });
};
