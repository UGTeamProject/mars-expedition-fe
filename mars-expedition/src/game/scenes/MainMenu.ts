import { GameObjects, Scene } from 'phaser';
import { EventBus } from '../EventBus.ts';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(640, 320, 'background');
        this.title = this.add
            .text(640, 460, 'Start Game', {
                fontFamily: 'Arial Black',
                fontSize: 38,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center',
            })
            .setOrigin(0.5)
            .setDepth(100)
            .setInteractive();
        this.title.on(
            'pointerdown',
            () => {
                this.title.setStyle({
                    color: '#ff0000',
                });
                this.tweens.add({
                    targets: this.title,
                    scaleX: 1.2,
                    scaleY: 1.2,
                    duration: 300,
                    yoyo: true,
                    onComplete: () => {
                        this.title.setStyle({
                            color: '#ffffff',
                        });
                        this.changeScene();
                    },
                });
            },
            this,
        );
        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('MainGame');
    }
}
