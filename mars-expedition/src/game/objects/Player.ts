export class Player extends Phaser.Physics.Arcade.Sprite {
    private speed: number;
    private health: number;
    private maxHealth: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player', 'player-static');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = 200;
        this.health = 100;
        this.maxHealth = 100;
        this.setScale(2);
        this.setCollideWorldBounds(true);
        this.setBounce(0.2);
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNames('player', { prefix: 'down-', end: 5 }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNames('player', { prefix: 'right-', end: 5 }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNames('player', { prefix: 'up-', end: 5 }),
            frameRate: 8,
            repeat: -1,
        });
    }

    update(cursors?: Phaser.Types.Input.Keyboard.CursorKeys) {
        if (!cursors) return;
        this.setVelocity(0);
        if (cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.setFlipX(true);
            this.anims.play('right', true);
        } else if (cursors.right.isDown) {
            this.setFlipX(false);
            this.anims.play('right', true);
            this.setVelocityX(this.speed);
        }

        if (cursors.up.isDown) {
            this.anims.play('up', true);
            this.setVelocityY(-this.speed);
        } else if (cursors.down.isDown) {
            this.anims.play('down', true);
            this.setVelocityY(this.speed);
        }
    }
}
