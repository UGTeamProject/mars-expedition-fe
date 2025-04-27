import { GoldMine } from './GoldMine.ts';
import { Building } from './Building.ts';
import { CurrencyAmount } from './types.ts';
import { GemMine } from './GemMine.ts';
import { DiamondMine } from './DiamondMine.ts';

export type BuildingType = 'goldMine' | 'gemMine' | 'diamondMine';

export class BuildingFactory {
    private readonly scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    create(
        type: BuildingType,
        x: number,
        y: number,
        productionFinishedCallback: (amountGathered: Partial<CurrencyAmount>) => void,
    ): Building {
        const buildingConstructors: Record<BuildingType, () => Building> = {
            goldMine: () => new GoldMine(this.scene, x, y, productionFinishedCallback, 1),
            gemMine: () => new GemMine(this.scene, x, y, productionFinishedCallback, 1),
            diamondMine: () => new DiamondMine(this.scene, x, y, productionFinishedCallback, 1),
        };

        const createBuilding = buildingConstructors[type];
        if (!createBuilding) {
            throw new Error(`Building type ${type} not found`);
        }

        return createBuilding();
    }
}
