import * as http from 'http'
import { Server, Socket } from 'socket.io';
import { configureChatClient, systemMessage } from './chatServer';
import { CHAT_MESSAGE, SET_NAME } from './events';
import { getName, setName } from './gameUtils';

export const configureIoServer = (httpServer: http.Server) => {
    const io = new Server(httpServer);
    io.on('connection', (socket) => {
        configureChatClient(io, socket);
        socket.on(SET_NAME,  (name: string) => setName(socket, name))
    });
};
