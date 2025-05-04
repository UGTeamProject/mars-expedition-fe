import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        const { width, height } = this.scale;
        this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(width, height);
        this.add.rectangle(width / 2, height / 2, 468, 32).setStrokeStyle(1, 0xffffff);

        const bar = this.add.rectangle(width / 2 - 230, height / 2, 4, 28, 0xffffff);
        this.load.on('progress', (progress: number) => {
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {
        this.load.setPath('assets');
    }

    create() {
        this.scene.start('MainGame');
    }
}
