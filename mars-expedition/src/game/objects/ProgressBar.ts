import { GameObjects } from 'phaser';

export class progressBar extends GameObjects.Line {
    private progress: number;
    private elapsedTime: number;
    private initialX: number;
    private initialY: number;

    constructor(scene: Phaser.Scene, x: number, y: number, progress: number) {
        super(scene, 0, 0, x, y, x + (progress / 100) * 70, y, 0xff0000);
        this.initialX = x;
        this.initialY = y;
        this.setOrigin(0, 0);
        this.setLineWidth(5);
        this.progress = progress;
        this.elapsedTime = 0;
    }

    update(time: number, delta: number, progress: number) {
        this.elapsedTime += delta;
        this.progress = progress;
        this.setTo(this.initialX, this.initialY, this.initialX + (this.progress / 100) * 70, this.initialY);
        super.update(time, delta);
    }
}
