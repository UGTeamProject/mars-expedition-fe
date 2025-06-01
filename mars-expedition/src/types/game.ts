import { BuildingType } from '../game/objects/Building/BuildingFactory';
import { CurrencyAmount } from '../game/objects/Building/types';

export interface GameData {
    currencies: CurrencyAmount;
    buildings: Array<{
        type: BuildingType;
        x: number;
        y: number;
        level: number;
        productionProgress?: number;
    }>;
    timeSpent: number;
}

export interface WindowExtensions {
    keycloak?: {
        token?: string;
    };
    game?: Phaser.Game;
}

declare global {
    interface Window extends WindowExtensions {}
}
