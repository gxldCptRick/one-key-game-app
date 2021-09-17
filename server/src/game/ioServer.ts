import * as http from 'http'
import { Server, Socket } from 'socket.io';

interface NameDict {
    [key: string]: string | undefined
}

const names: NameDict = {}

const getName = (client: Socket) => {
    return names[client.id] || client.id
}
const setName = (client: Socket, name: string | undefined) => {
    names[client.id] = name
}

const systemMessage = (io: Server, message: string) => {
    io.emit('chat message', `Server - ${message}`)
}

const configureChatServer = (io: Server, client: Socket) => { 
    console.log('Someone connected :(');
    client.on('disconnect', () => {
        console.log(`client: ${getName(client)} has disconnected`);
        systemMessage(io, `${getName(client)} has left the chat`)
    });
    
    client.on('set name', (name) => {
        setName(client, name);
    })

    client.on('chat message', (msg) => {
        console.log(`Recieved: ${msg} from client: ${client.id}`);
        io.emit('chat message', `${getName(client)} - ${msg}`);
    });
}

export const configureIoServer = (httpServer: http.Server) => {
    const io = new Server(httpServer);
    io.on('connection', (socket) => {
        systemMessage(io, `${getName(socket)} has joined the chat`)
        configureChatServer(io, socket);
    });
};
