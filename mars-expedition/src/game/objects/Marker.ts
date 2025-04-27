import { GameObjects } from 'phaser';

export class Marker extends GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, textureName: string = 'marker') {
        super(scene, x, y, textureName);
        this.setOrigin(0, 0);
    }

    update(time: number, delta: number) {
        super.update(time, delta);
    }
}
