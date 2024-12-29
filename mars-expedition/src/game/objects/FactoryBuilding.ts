import { progressBar } from './ProgressBar.ts';
import { GameObjects } from 'phaser';

export class FactoryBuilding extends GameObjects.Sprite {
    static readonly PRICE: number = 50;
    private readonly cooldownInMilis: number = 0;
    private elapsedTime!: number;
    private finishedProduction: boolean = false;
    private onFinishedProduction: (coinsGathered: number) => void;
    private progressBar: progressBar;
    private coinNotifier: GameObjects.Text;
    private coinsToProduce: number = 10;

    constructor(scene: Phaser.Scene, x: number, y: number, onFinishedProduction: (coinsGathered: number) => void) {
        super(scene, x, y, 'factoryBuilding');
        this.setOrigin(0, 0);
        this.cooldownInMilis = 5000;
        this.elapsedTime = 0;
        this.onFinishedProduction = onFinishedProduction;
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
            this.y - this.scene.textures.get('factoryBuilding').getSourceImage().height / 2 - 8,
            `+${this.coinsToProduce} coins`,
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
        this.onFinishedProduction(10);
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
