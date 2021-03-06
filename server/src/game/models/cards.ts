import { OneKeyGameState } from "./gameState";

export enum CardColor {
    Red,
    Yellow,
    Green,
    Unknown
}

const TOTAL_CARDS = 11;

export interface Card {
    id: number;
    color: CardColor;
}

const createCard = (id: number) => ({id, color: CardColor.Unknown})
export const defaultCards = () => {
    let cards: Card[] = [];
    for(let i = 0; i < TOTAL_CARDS; i++){
        cards.push(createCard(i))
    }
    return cards;
}

export const shuffleCards = (cards: Card[]) => {
    for(let i = cards.length; i > 0; i--){
        // will always get value between 0 and less than max
        let randomIndex = Math.floor(Math.random() * i);
        // swap the values of i and randomIndex
        [cards[i - 1], cards[randomIndex]] = [cards[randomIndex], cards[i - 1]]
    }
    return cards;
}

export const drawCards = (cards: Card[], amountToDraw: number = 1) => {
    let cardsDrawn: Card[] = [];
    for(let i = 0; i < amountToDraw && cards.length > 0; i++){
        cardsDrawn.push(cards.shift()!)
    }
    return cardsDrawn;
}

export const findCardById = (gameState: OneKeyGameState, id: number) => {
    return gameState.playerCards.find(c => c.id === id) || gameState.leaderCards.find(c => c.id === id)
}
