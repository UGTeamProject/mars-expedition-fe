class DebugInfo extends Phaser.GameObjects.GameObject {
    text: Phaser.GameObjects.Text;
    x: number;
    y: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, 'DebugInfo');
        this.x = x;
        this.y = y;
        this.text = scene.add.text(x, y, 'Debug Info:', {
            fontSize: '16px',
            color: '#ffffff',
        });
        this.text.setScrollFactor(0);
        scene.add.existing(this);
    }

    updateInfo(text: string) {
        this.text.setText(text);
    }
}

export { DebugInfo };
