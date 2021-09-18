import { Socket } from "socket.io"
import { OneKeyGameState } from "./gameState"

export enum PlayerType {
    Guesser, 
    Leader
}

export interface Player {
    id: string;
    role: PlayerType;
}

export const createInitialPlayer: (c: Socket) => Player = (c: Socket) => {
    return {
        id: c.id,
        role: PlayerType.Leader,
        name: 'Player 1'
    }
}

export const createPlayer = (c: Socket, gameState: OneKeyGameState) => {
    return {
        id: c.id,
        role: PlayerType.Guesser,
        // adding one to the name since they will be added after so length is behind by one
        name: `Player ${gameState.players.length + 1}`
    }
}