import { DebugInfo } from '../objects/DebugInfo.ts';
import { FactoryBuilding } from '../objects/FactoryBuilding.ts';
import GameObject = Phaser.GameObjects.GameObject;

const TILE_SIZE = 32;

export class MainGame extends Phaser.Scene {
    readonly UPDATE_DELTA: number = 200;
    private map: Phaser.Tilemaps.Tilemap;
    private layer: Phaser.Tilemaps.TilemapLayer;
    private marker: Phaser.GameObjects.Sprite;
    private debugInfo: DebugInfo;
    private buildings: Phaser.GameObjects.Group;
    private frameTime: number;
    private coins: number;

    constructor() {
        super('MainGame');
        this.frameTime = 0;
        this.coins = 100;
    }

    preload() {
        this.load.image('marker', 'assets/baseTile.png');
        this.load.image('tileset', 'assets/tiles/iso-64x64-outside.png');
        this.load.image('factoryBuilding', 'assets/factory.png');
        this.load.tilemapTiledJSON('map', 'assets/tiles/map.json');
        this.load.image('gameBackground', 'assets/background.png');
    }

    create() {
        this.map = this.add.tilemap('map');
        this.buildings = this.add.group();
        this.add.sprite(TILE_SIZE, this.map.heightInPixels / 2 + TILE_SIZE, 'gameBackground');
        const tileSet = this.map.addTilesetImage('tileset');
        if (!tileSet) {
            console.error('Tileset not found');
            return;
        }
        this.layer = this.map.createLayer('Ground', tileSet, 0, 0) as Phaser.Tilemaps.TilemapLayer;

        this.marker = this.add.sprite(0, 0, 'marker');
        this.marker.setOrigin(0, 0);

        this.input.on(Phaser.Input.Events.POINTER_MOVE, this.onPointerMove);
        this.input.on(Phaser.Input.Events.POINTER_UP, this.onPointerUp);

        this.cameras.main.centerOn(TILE_SIZE, this.layer.height / 2 + TILE_SIZE).setZoom(1);
        this.debugInfo = this.add.existing(new DebugInfo(this, 10, 10));
    }

    addBuilding(x: number, y: number) {
        if (this.coins < FactoryBuilding.PRICE) {
            return;
        }
        const added = new FactoryBuilding(this, x, y, this.onFinishedProduction);
        this.buildings.add(added, true);
        this.coins -= FactoryBuilding.PRICE;
    }

    onFinishedProduction = (coinsGathered: number) => {
        this.coins += coinsGathered;
    };

    onPointerUp = (_e: Phaser.Input.Pointer) => {
        if (
            this.buildings
                .getChildren()
                .some(b => (b as FactoryBuilding).compareCoordinates(this.marker.x, this.marker.y))
        ) {
            return;
        }
        if (this.marker.visible) {
            this.addBuilding(this.marker.x, this.marker.y);
        }
    };

    onPointerMove = (e: Phaser.Input.Pointer) => {
        const px = this.cameras.main.worldView.x + e.x;
        const py = this.cameras.main.worldView.y + e.y;
        const tile = this.getTile(px, py, [this.layer]);
        if (!tile) {
            this.marker.visible = false;
            return;
        }
        this.marker.visible = true;
        this.marker.setPosition(tile.pixelX, tile.pixelY);
    };

    getTile(x: number, y: number, layers: Phaser.Tilemaps.TilemapLayer[]): Phaser.Tilemaps.Tile | undefined {
        if (layers.length === 0) return undefined;

        const layer = layers.pop()!;
        const tile: Phaser.Tilemaps.Tile = layer.getTileAtWorldXY(x, y);
        if (tile) return tile;
        else return this.getTile(x, y, layers);
    }

    getTileAt(iX: number, iY: number, layers: Phaser.Tilemaps.TilemapLayer[]): Phaser.Tilemaps.Tile | undefined {
        if (layers.length === 0) return undefined;

        const layer = layers.pop()!;
        const tile: Phaser.Tilemaps.Tile = layer.getTileAt(iX, iY);
        if (tile) return tile;
        else return this.getTileAt(iX, iY, layers);
    }

    update(_time: number, delta: number): void {
        this.frameTime += delta;
        if (this.frameTime > this.UPDATE_DELTA) {
            this.frameTime = 0;
        }
        this.debugInfo.updateInfo(`Coins: ${this.coins}`);
        this.buildings.getChildren().forEach((b: GameObject) => b.update(_time, delta));
    }
}
