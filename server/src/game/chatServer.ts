import { Server, Socket } from "socket.io";
import { CHAT_MESSAGE } from "./events";
import { getName } from "./gameUtils";

export const systemMessage = (message: string) => `System - ${message}`;

export const configureChatClient = (io: Server, client: Socket) => { 
    client.broadcast.emit(CHAT_MESSAGE, systemMessage(`${getName(client)} has joined the chat`))
    console.log('Someone connected :(');
    client.on('disconnect', () => {
        console.log(`client: ${getName(client)} has disconnected`);
        io.emit(CHAT_MESSAGE, systemMessage(`${getName(client)} has left the chat`))
    });

    client.on(CHAT_MESSAGE, (msg) => {
        console.log(`Recieved: ${msg} from client: ${client.id}`);
        io.emit(CHAT_MESSAGE, `${getName(client)} - ${msg}`);
    });
}