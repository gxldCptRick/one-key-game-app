import {Socket} from 'socket.io'
interface NameDict {
    [key: string]: string | undefined
}


const names: NameDict = {}

export const getName = (client: Socket) => {
    return names[client.id] || client.id
}

export const setName = (client: Socket, name: string | undefined) => {
    names[client.id] = name
}