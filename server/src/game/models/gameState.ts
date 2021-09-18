import { Socket } from "socket.io";
import * as crypto from "crypto";
import { Card, defaultCards, shuffleCards } from "./cards";
import { Player } from "./player";

export const generateCode = () => {
    return crypto.randomBytes(4).toString('hex');
}

export interface OneKeyGameState {
    players: Player[];
    currentTime: number;
    gameCode: string;
    cards: Card[];
    playerCards: Card[];
    leaderCards: Card[];
    guessCards: Card[];
    currentRound: number;

}


export const createInitialGameState: () => OneKeyGameState = () => {
    return  {
        currentTime: 30,
        players: [],
        gameCode: generateCode(),
        playerCards: [],
        leaderCards: [],
        guessCards: [],
        cards: shuffleCards(defaultCards()),
        currentRound: 0,
    }
}