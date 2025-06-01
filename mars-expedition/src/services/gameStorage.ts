import { GameData } from '../types/game';

const GAME_DATA_KEY = 'mars-expedition-game-data';

export const gameStorage = {
    save: (gameData: GameData): void => {
        try {
            localStorage.setItem(GAME_DATA_KEY, JSON.stringify(gameData));
        } catch (error) {
            console.error('Failed to save game data to localStorage:', error);
        }
    },

    load: (): GameData | null => {
        try {
            const data = localStorage.getItem(GAME_DATA_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load game data from localStorage:', error);
            return null;
        }
    },

    clear: (): void => {
        try {
            localStorage.removeItem(GAME_DATA_KEY);
        } catch (error) {
            console.error('Failed to clear game data from localStorage:', error);
        }
    },
};
