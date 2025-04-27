import { Building } from './Building.ts';
import { CurrencyAmount } from './types.ts';

const GEM_MINE_PRICE: CurrencyAmount = {
    gold: 100,
    diamonds: 0,
    gems: 0,
};

export class GemMine extends Building {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        productionFinishedCallback: (amountGathered: Partial<CurrencyAmount>) => void,
        amountToProduce: number,
    ) {
        super(scene, x, y, productionFinishedCallback, amountToProduce, 'gemMine', 'gems', GEM_MINE_PRICE, 5000);
    }

    update(time: number, delta: number) {
        super.update(time, delta);
    }
}
