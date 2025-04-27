import { Building } from './Building.ts';

const GOLD_MINE_PRICE: number = 100;

export class GoldMine extends Building {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        productionFinishedCallback: (amountGathered: number) => void,
        amountToProduce: number,
    ) {
        super(scene, x, y, productionFinishedCallback, amountToProduce, 'goldMine', 'gold', GOLD_MINE_PRICE, 5000);
    }

    update(time: number, delta: number) {
        super.update(time, delta);
    }
}
