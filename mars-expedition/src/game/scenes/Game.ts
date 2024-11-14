import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { DebugInfo } from '../objects/DebugInfo.ts';
import { Player } from '../objects/Player.ts';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    debugInfo: DebugInfo;
    player: Player;
    playerMap: Phaser.Tilemaps.Tilemap;
    keys?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super('Game');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);
        this.keys = this.input.keyboard?.createCursorKeys();
        this.debugInfo = new DebugInfo(this, 10, 10);
        this.player = new Player(this, 512, 384);
        EventBus.emit('current-scene-ready', this);
    }

    update(time: number, delta: number) {
        super.update(time, delta);
        this.debugInfo.updateInfo(
            `FPS: ${Math.floor(this.game.loop.actualFps)}
            \nPlayer position: ${this.player.x.toFixed(2)}, ${this.player.y.toFixed(2)}`,
        );
        this.player.update(this.keys);
    }

    preload() {
        this.load.atlas('player', 'assets/tiles/player.png', 'assets/tiles/player.json');
        this.textures.addSpriteSheetFromAtlas('player-static', {
            frameWidth: 48,
            frameHeight: 48,
            atlas: 'player',
            frame: 'down-0',
        });
        this.load.image('background', 'assets/background.png');
    }
}
