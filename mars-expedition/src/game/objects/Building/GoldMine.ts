import { Building } from './Building.ts';
import { CurrencyAmount } from './types.ts';

export class GoldMine extends Building {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        productionFinishedCallback: (amountGathered: Partial<CurrencyAmount>) => void,
        amountToProduce: number,
    ) {
        super(scene, x, y, productionFinishedCallback, amountToProduce, 'goldMine', 'gold', 5000);
    }

    update(time: number, delta: number) {
        super.update(time, delta);
    }

    public getBuildingType(): string {
        return 'goldMine';
    }
}
