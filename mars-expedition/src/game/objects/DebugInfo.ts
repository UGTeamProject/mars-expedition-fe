class DebugInfo extends Phaser.GameObjects.GameObject {
    text: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, 'DebugInfo');
        this.text = scene.add.text(x, y, 'Debug Info:', {
            fontSize: '24px',
            color: '#ffffff',
            fontFamily: 'Pixelify Sans',
        });
        this.text.setScrollFactor(0);
        scene.add.existing(this);
    }

    updateInfo(text: string) {
        this.text.setText(text);
    }
}

export { DebugInfo };
