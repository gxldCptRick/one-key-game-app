import { CardColor } from "./models/cards";

export const CHAT_MESSAGE = 'chat message';
export const SET_NAME = 'set name';
export const TICK = 'tick';
export const GAME_OVER = 'game over';
export const GAME_STATE = 'game state';
export const CREATE_SESSION = 'create session';
export const JOIN_SESSION = 'join session';
export const INVALID_SESSION = 'invalid session';
export const CARD_COLOR_CHANGED = 'card color changed';

export interface CardColorChangedEvent {
    color: CardColor;
    id: number;
};