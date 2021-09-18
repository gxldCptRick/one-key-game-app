import { Server, Socket } from "socket.io"
import { TICK, GAME_OVER, CREATE_SESSION, GAME_STATE } from "./events";
import { createInitialGameState, OneKeyGameState } from "./models/gameState"
import { createInitialPlayer } from "./models/player";

interface GameSessions {
    [key: string]: OneKeyGameState
}

const gameSessions: GameSessions = {}

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
        gameSessions[initialGameState.gameCode] = initialGameState
        initialGameState.players.push(createInitialPlayer(client));
        server.emit(GAME_STATE, initialGameState);
    })

}

export const configureGameServer = (server: Server, client: Socket) => {
    configureGameInit(server, client);
}