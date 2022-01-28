import { Server, Socket } from "socket.io";
import { CHAT_MESSAGE } from "../../game/events";
import { getName, setName } from "../../game/gameUtils";
import { systemMessage } from "../chatServer";

export type CommandHandler = (io: Server, client: Socket, value: string | undefined) => void

const defaultCommandHandler: CommandHandler = (_, client, value) => {
}

class UnknownCommandError extends Error {
    public name: string
    constructor(name: string){
        super();
        this.name = name;
    }
}

export class CommandDispatcher {
    private handlers: Map<string, CommandHandler>;
    constructor(){
        this.handlers = new Map<string, CommandHandler>();
    }
    setCommandHandler(name: string, handler: CommandHandler) {
        this.handlers.set(name, handler)
    }
    getCommandHandler(name: string) {
        const handler = this.handlers.get(name)
        if(handler === undefined){
            throw new UnknownCommandError(name)
        }else{
            return handler;
        }
    }
}

export const configureBaseCommands = (dispatcher: CommandDispatcher) => {
    dispatcher.setCommandHandler('setname', (_, client, name) => {
        client.emit(CHAT_MESSAGE, systemMessage(`Setting name to: ${name}`))
        client.broadcast.emit(CHAT_MESSAGE, systemMessage(`Say hello to ${name}`))
        setName(client, name)
     })
    dispatcher.setCommandHandler('shout', (io, client, message) => {
        client.emit(CHAT_MESSAGE, systemMessage(`Shouted: ${message}`))
        io.emit(CHAT_MESSAGE, `${getName(client)} - ${message?.toUpperCase()}!!!`)
    })
}