import { Server, Socket } from "socket.io"
import { TICK, GAME_OVER, CREATE_SESSION, GAME_STATE, JOIN_SESSION, INVALID_SESSION, CARD_COLOR_CHANGED, CardColorChangedEvent } from "./events";
import { CardColor, findCardById } from "./models/cards";
import { createInitialGameState, OneKeyGameState } from "./models/gameState"
import { createInitialPlayer, createPlayer } from "./models/player";

interface GameSessions {
    [key: string]: OneKeyGameState
}
interface StringToString {
    [key: string]: string
}

const gameSessions: GameSessions = {}
const idToGame: StringToString = {}

const milliPerSecond = 1000;
const startRoundTimer = (server: Server, state: OneKeyGameState) => {
    let timerAdvanceCallback = () => {
        state.currentTime -= 1;
        if(state.currentTime == 0){
            clearInterval(timerTimeoutId);
            server.emit(GAME_OVER, false);
        }
        server.emit(TICK, state)
    }
    let timerTimeoutId = setTimeout(timerAdvanceCallback, milliPerSecond);
    return () => clearInterval(timerTimeoutId);
}

const configureGameInit = (server: Server, client: Socket) => {
    client.on(CREATE_SESSION, () => {
        let initialGameState = createInitialGameState();
        console.debug(`Creating new game session ${initialGameState}`);
        gameSessions[initialGameState.gameCode] = initialGameState
        idToGame[client.id] = initialGameState.gameCode
        initialGameState.players.push(createInitialPlayer(client));
        server.emit(GAME_STATE, initialGameState);
    });

    client.on(JOIN_SESSION, (code: string) => {
        let gameState = gameSessions[code];
        if(gameState === undefined){
            client.emit(INVALID_SESSION); 
        }else{
            idToGame[client.id] = code
            gameState.players.push(createPlayer(client, gameState));
            client.emit(GAME_STATE, gameState);
        }
    });
}

const configureGameActions = (server: Server, client: Socket) => {
    client.on(CARD_COLOR_CHANGED, (cardColorChange: CardColorChangedEvent) => {
        let gameState = gameSessions[idToGame[client.id]]
        let card = findCardById(gameState, cardColorChange.id);
        if (card !== undefined){
            console.debug(`Updating game state for card ${cardColorChange}`)
            card.color = cardColorChange.color;
            server.emit(GAME_STATE, gameState)
        }else{
            console.log(`Could not find card with given id: ${cardColorChange.id}`)
        }
    })
}

export const configureGameServer = (server: Server, client: Socket) => {
    configureGameInit(server, client);
    configureGameActions(server, client);
}