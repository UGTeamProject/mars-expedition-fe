import { GameObjects } from 'phaser';

const NOTIFICATION_OFFSET_PX = 20;

export class NotificationPopup extends GameObjects.Text {
    constructor(scene: Phaser.Scene, x: number, y: number, text: string) {
        super(scene, x, y - NOTIFICATION_OFFSET_PX, text, {
            fontSize: '16px',
            color: '#ffaa00',
            fontFamily: 'Pixelify Sans',
            align: 'center',
        });
        this.setScrollFactor(1);
    }
}
