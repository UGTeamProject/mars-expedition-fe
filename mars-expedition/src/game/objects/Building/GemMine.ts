import { Building } from './Building.ts';
import { CurrencyAmount } from './types.ts';

export class GemMine extends Building {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        productionFinishedCallback: (amountGathered: Partial<CurrencyAmount>) => void,
        amountToProduce: number,
    ) {
        super(scene, x, y, productionFinishedCallback, amountToProduce, 'gemMine', 'gems', 5000);
    }

    update(time: number, delta: number) {
        super.update(time, delta);
    }
}
