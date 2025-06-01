import { GameObjects } from 'phaser';
import { ProgressBar } from '../ProgressBar.ts';
import { NotificationPopup } from '../NotificationPopup.ts';
import { Currency, CurrencyAmount } from './types.ts';

export abstract class Building extends GameObjects.Sprite {
    private readonly cooldownMs: number;
    private readonly productionFinishedCallback: (amountGathered: Partial<CurrencyAmount>) => void;
    private readonly progressBar: ProgressBar;
    private readonly notificationPopup: NotificationPopup;
    private readonly amountToProduce: number;
    private readonly resourceToProduce: Currency;
    private elapsedTime: number = 0;
    private isProductionFinished: boolean = false;
    private level: number = 1;

    protected constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        productionFinishedCallback: (amountGathered: Partial<CurrencyAmount>) => void,
        amountToProduce: number,
        textureName: string,
        resourceToProduce: Currency,
        cooldownMs: number = 5000,
    ) {
        super(scene, x, y, textureName);
        this.setOrigin(0, 0);
        this.setDepth(y);
        this.productionFinishedCallback = productionFinishedCallback;
        this.amountToProduce = amountToProduce;
        this.resourceToProduce = resourceToProduce;
        this.cooldownMs = cooldownMs;
        this.notificationPopup = this.scene.add.existing(
            new NotificationPopup(this.scene, this.x, this.y, `+${this.amountToProduce} ${this.resourceToProduce}`),
        );
        this.progressBar = this.scene.add.existing(
            new ProgressBar(
                this.scene,
                this.x,
                this.y,
                100 - ((this.cooldownMs - this.elapsedTime) / this.cooldownMs) * 100,
            ),
        );

        this.startProduction();
    }

    startProduction() {
        this.isProductionFinished = false;
        this.elapsedTime = 0;
        this.notificationPopup.setVisible(false);
        this.progressBar.setVisible(true);
    }

    finishProduction() {
        this.isProductionFinished = true;
        this.productionFinishedCallback({
            [this.resourceToProduce]: this.amountToProduce,
        });
        this.notificationPopup.setVisible(true);
        this.progressBar.setVisible(false);
        this.scene.time.delayedCall(1000, () => {
            this.notificationPopup.setVisible(false);
            this.startProduction();
        });
    }

    update(time: number, delta: number) {
        this.elapsedTime += delta;
        if (this.scene.children.exists(this.progressBar)) {
            this.progressBar.update(time, delta, 100 - ((this.cooldownMs - this.elapsedTime) / this.cooldownMs) * 100);
        }
        if (this.elapsedTime >= this.cooldownMs && !this.isProductionFinished) {
            this.finishProduction();
            this.elapsedTime = 0;
        }
        super.update(time, delta);
    }

    public abstract getBuildingType(): string;

    public getLevel(): number {
        return this.level;
    }

    public setLevel(level: number): void {
        this.level = level;
    }

    public getProductionProgress(): number {
        return (this.elapsedTime / this.cooldownMs) * 100;
    }

    public setProductionProgress(progress: number): void {
        this.elapsedTime = (progress / 100) * this.cooldownMs;
    }
}
