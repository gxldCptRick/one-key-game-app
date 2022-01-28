import { Server, Socket } from "socket.io";
import { CHAT_MESSAGE } from "../game/events";
import { getName, setName } from "../game/gameUtils";
import { CommandDispatcher, configureBaseCommands } from "./commands/baseCommands";
import { configureGameCommands } from "./commands/gameCommands";

export const systemMessage = (message: string) => `System - ${message}`;
export const parseCommandString = (message: string) => {
    const spaceIndex = message.indexOf(' ')
    const commandName = message.substring(1, spaceIndex || message.length)
    let commandValue;
    if(spaceIndex){
        commandValue = message.substring(spaceIndex + 1, message.length)
    }
    return {commandName, commandValue}
}



const dispatcher = new CommandDispatcher();
configureBaseCommands(dispatcher)
configureGameCommands(dispatcher)

export const configureChatClient = (io: Server, client: Socket) => { 
    client.broadcast.emit(CHAT_MESSAGE, systemMessage(`${getName(client)} has joined the chat`))
    console.info('New Client Connection');
    client.on('disconnect', () => {
        console.log(`client: ${getName(client)} has disconnected`);
        io.emit(CHAT_MESSAGE, systemMessage(`${getName(client)} has left the chat`))
    });

    client.on(CHAT_MESSAGE, (msg: string) => {
        console.debug(`Recieved: ${msg} from client: ${client.id}`);
        if(msg.startsWith('/')) {
            const {commandName, commandValue} = parseCommandString(msg)
            try{
                dispatcher.getCommandHandler(commandName)(io, client, commandValue);
            }catch(err) {
                client.emit(CHAT_MESSAGE, systemMessage(`Failed to understand or execute: ${msg}`))
            }
        }else {
            io.emit(CHAT_MESSAGE, `${getName(client)} - ${msg}`);
        }
    });
}