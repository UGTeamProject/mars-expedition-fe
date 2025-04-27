import { GoldMine } from './GoldMine.ts';
import { Building } from './Building.ts';

export type BuildingType = 'goldMine' | 'factoryGems' | 'factoryDiamonds';

export class BuildingFactory {
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    create(
        type: BuildingType,
        x: number,
        y: number,
        productionFinishedCallback: (amountGathered: number) => void,
    ): Building {
        const buildingConstructors: Record<BuildingType, () => Building> = {
            goldMine: () => new GoldMine(this.scene, x, y, productionFinishedCallback, 1, 'goldMine', 'coins', 0, 5000),
            factoryGems: () =>
                new GoldMine(this.scene, x, y, productionFinishedCallback, 1, 'goldMine', 'coins', 0, 5000),
            factoryDiamonds: () =>
                new GoldMine(this.scene, x, y, productionFinishedCallback, 1, 'goldMine', 'coins', 0, 5000),
        };

        const createBuilding = buildingConstructors[type];
        if (!createBuilding) {
            throw new Error(`Building type ${type} not found`);
        }

        return createBuilding();
    }
}
