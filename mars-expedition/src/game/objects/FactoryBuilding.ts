import { progressBar } from './ProgressBar.ts';
import { GameObjects } from 'phaser';

export class FactoryBuilding extends GameObjects.Sprite {
    private price: number = 50;
    private readonly cooldownInMilis: number = 0;
    private elapsedTime!: number;
    private finishedProduction: boolean = false;
    private onFinishedProduction: (coinsGathered: number) => void;
    private progressBar: progressBar;
    private coinNotifier: GameObjects.Text;
    private amountToProduce: number = 10;
    private resourceToProduce: string = 'coins';
    private textureName: string;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        onFinishedProduction: (coinsGathered: number) => void,
        price: number,
        amountToProduce: number,
        textureName: string = 'factoryBuilding',
        resourceToProduce: string = 'coins',
    ) {
        super(scene, x, y, textureName);
        this.textureName = textureName;
        this.setOrigin(0, 0);
        this.cooldownInMilis = 5000;
        this.elapsedTime = 0;
        this.price = price;
        this.amountToProduce = amountToProduce;
        this.onFinishedProduction = onFinishedProduction;
        this.resourceToProduce = resourceToProduce;
        this.progressBar = this.scene.add.existing(
            new progressBar(
                this.scene,
                this.x,
                this.y,
                100 - ((this.cooldownInMilis - this.elapsedTime) / this.cooldownInMilis) * 100,
            ),
        );
        this.coinNotifier = this.scene.add.text(
            this.x + 640,
            this.y - this.scene.textures.get(this.textureName).getSourceImage().height / 2 - 8,
            `+${this.amountToProduce} ${this.resourceToProduce}`,
            {
                fontSize: '16px',
                color: '#ffaa00',
            },
        );
        this.coinNotifier.setScrollFactor(0);
        this.startProduction();
    }

    compareCoordinates(x: number, y: number) {
        return this.x === x && this.y === y;
    }

    startProduction() {
        this.finishedProduction = false;
        this.elapsedTime = 0;
        this.coinNotifier.setVisible(false);
        this.progressBar.setVisible(true);
    }

    finishProduction() {
        this.finishedProduction = true;
        this.onFinishedProduction(this.amountToProduce);
        this.coinNotifier.setVisible(true);
        this.progressBar.setVisible(false);
        this.scene.time.delayedCall(1000, () => {
            this.coinNotifier.setVisible(false);
            this.startProduction();
        });
    }

    update(time: number, delta: number) {
        this.elapsedTime += delta;
        if (this.scene.children.exists(this.progressBar)) {
            this.progressBar.update(
                time,
                delta,
                100 - ((this.cooldownInMilis - this.elapsedTime) / this.cooldownInMilis) * 100,
            );
        }
        if (this.elapsedTime >= this.cooldownInMilis && !this.finishedProduction) {
            this.finishProduction();
            this.elapsedTime = 0;
        }
        super.update(time, delta);
    }
}
