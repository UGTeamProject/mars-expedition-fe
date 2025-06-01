import { Marker } from '../objects/Marker.ts';
import { Building } from '../objects/Building/Building.ts';
import { BUILDING_PRICES, BuildingFactory, BuildingType } from '../objects/Building/BuildingFactory.ts';
import { CurrencyAmount } from '../objects/Building/types.ts';
import { CurrencyBar } from '../objects/CurrencyBar.ts';
import { BuildingTypePicker } from '../objects/BuildingTypePicker.ts';
import { api } from '../../services/api.ts';
import { gameStorage } from '../../services/gameStorage.ts';
import { GameData } from '../../types/game.ts';
import GameObject = Phaser.GameObjects.GameObject;

const TILE_SIZE = 64;

export class MainGame extends Phaser.Scene {
    readonly UPDATE_DELTA: number = 200;
    private map: Phaser.Tilemaps.Tilemap;
    private layers: Phaser.Tilemaps.TilemapLayer[] = [];
    private marker: Marker;
    private buildings: Phaser.GameObjects.Group;
    private frameTime: number;
    private readonly buildingFactory: BuildingFactory;
    private selectedBuildingType: BuildingType | undefined;
    private currencyBar: CurrencyBar;
    private buildingTypePicker: BuildingTypePicker;
    private currencies: CurrencyAmount = {
        gold: 100,
        diamonds: 0,
        gems: 0,
    };
    private gameStartTime: number = Date.now();
    private lastSaveTime: number = Date.now();
    private readonly SAVE_INTERVAL = 60000; // 1 minute in milliseconds

    constructor() {
        super('MainGame');
        this.frameTime = 0;
        this.buildingFactory = new BuildingFactory(this);
    }

    preload() {
        this.load.image('marker', 'assets/marker.png');
        this.load.image('tileset', 'assets/tiles/iso-64x64-outside.png');
        this.load.image('factoryBuilding', 'assets/factory.png');
        this.load.image('diamondMine', 'assets/diamondMine.png');
        this.load.image('goldMine', 'assets/goldMine.png');
        this.load.image('gemMine', 'assets/gemMine.png');
        this.load.image('currencyBar', 'assets/currencyBar.png');
        this.load.tilemapTiledJSON('map', 'assets/tiles/map.json');
        this.load.image('gameBackground', 'assets/background.png');
        this.load.audio('ambient', 'assets/sound/ambient.mp3');
        this.load.audio('coin', 'assets/sound/coins.mp3');
        this.load.audio('place', 'assets/sound/place.mp3');
    }

    create() {
        this.map = this.add.tilemap('map');
        this.buildings = this.add.group();

        const tileSet = this.map.addTilesetImage('tileset');
        if (!tileSet) {
            console.error('Tileset not found');
            return;
        }
        this.layers.push(this.map.createLayer('Ground', tileSet, 0, 0) as Phaser.Tilemaps.TilemapLayer);
        this.layers.push(this.map.createLayer('Rocks1', tileSet, 0, 0) as Phaser.Tilemaps.TilemapLayer);
        this.layers.push(this.map.createLayer('Rocks2', tileSet, 0, 0) as Phaser.Tilemaps.TilemapLayer);

        this.marker = new Marker(this, 0, 0);
        this.add.existing(this.marker);

        const mapWidth = this.map.widthInPixels;
        const mapHeight = this.map.heightInPixels;

        const centerX = mapWidth / 2;
        const centerY = mapHeight / 4;
        this.cameras.main.centerOn(centerX, centerY);
        this.cameras.main.setBackgroundColor('#893F49');

        this.input.on(Phaser.Input.Events.POINTER_MOVE, this.onPointerMove);
        this.input.on(Phaser.Input.Events.POINTER_UP, this.onPointerUp);

        this.currencyBar = this.add.existing(new CurrencyBar(this, centerX - 280, 0));
        this.buildingTypePicker = this.add.existing(new BuildingTypePicker(this, centerX + 100, 1000));
        this.sound.add('ambient').play({ loop: true, volume: 0.3 });

        // Load saved game data on startup
        this.loadSavedGameData();
    }

    addBuilding(x: number, y: number) {
        if (!this.selectedBuildingType) {
            return;
        }
        const buildingPrice = BUILDING_PRICES[this.selectedBuildingType];
        if (
            this.currencies.gold < buildingPrice.gold ||
            this.currencies.diamonds < buildingPrice.diamonds ||
            this.currencies.gems < buildingPrice.gems
        ) {
            console.log('Not enough resources to build');
            return;
        }
        const building = this.buildingFactory.create(
            this.selectedBuildingType,
            x,
            y,
            (amountGathered: Partial<CurrencyAmount>) => {
                this.currencies.gold += amountGathered.gold || 0;
                this.currencies.diamonds += amountGathered.diamonds || 0;
                this.currencies.gems += amountGathered.gems || 0;
                this.sound.add('coin').play({ volume: 0.3 });
            },
        );

        this.buildings.add(building, true);
        this.currencies.gold -= buildingPrice.gold;
        this.currencies.diamonds -= buildingPrice.diamonds;
        this.currencies.gems -= buildingPrice.gems;
        this.sound.add('place').play({ volume: 0.3 });
        this.selectedBuildingType = undefined;
    }

    onPointerUp = (_e: Phaser.Input.Pointer) => {
        const buildingExists = this.buildings.getChildren().some((b: GameObject) => {
            const building = b as Building;
            return building.x === this.marker.x && building.y === this.marker.y;
        });

        if (buildingExists) {
            return;
        }

        if (this.marker.visible) {
            this.addBuilding(this.marker.x, this.marker.y);
        }
    };

    onPointerMove = () => {
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;
        const tileXY = this.map.worldToTileXY(worldPoint.x, worldPoint.y - TILE_SIZE / 2, true);
        if (!tileXY) {
            this.marker.visible = false;
            return;
        }

        const tileY = tileXY?.y;
        let tileX = tileXY?.x;
        // Fix for isometric tile map
        if (tileY % 2 !== 0) {
            tileX -= 1;
        }

        const hoveredLayer = this.layers.findLast(layer => layer.hasTileAt(tileX, tileY));
        const hoveredTile = hoveredLayer?.getTileAt(tileX, tileY);

        if (!hoveredTile) {
            this.marker.visible = false;
            return;
        }

        this.marker.visible = true;
        this.marker.setPosition(hoveredTile.pixelX, hoveredTile.pixelY);
    };

    update(_time: number, delta: number): void {
        this.frameTime += delta;
        if (this.frameTime > this.UPDATE_DELTA) {
            this.frameTime = 0;
        }
        this.currencyBar.updateValues(this.currencies);
        this.buildings.getChildren().forEach((b: GameObject) => b.update(_time, delta));
        this.marker.update(_time, delta);
        this.buildingTypePicker.update(_time, delta);
        this.selectedBuildingType = this.buildingTypePicker.getSelectedBuildingType();

        // Auto-save every minute
        const currentTime = Date.now();
        if (currentTime - this.lastSaveTime >= this.SAVE_INTERVAL) {
            this.saveGameData();
            this.lastSaveTime = currentTime;
        }
    }

    private async saveGameData(): Promise<void> {
        try {
            const gameData = this.serializeGameData();

            // Save to localStorage
            gameStorage.save(gameData);

            // Also save to backend if authenticated
            const keycloak = window.keycloak;
            if (keycloak?.token) {
                await api.post(
                    '/game-session',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${keycloak.token}`,
                        },
                    },
                );
                await api.put('/game-session/update', gameData, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`,
                    },
                });
            }
        } catch (error) {
            console.error('Error saving game data:', error);
        }
    }

    private serializeGameData(): GameData {
        const buildingsData = this.buildings.getChildren().map((gameObject: GameObject) => {
            const building = gameObject as Building;
            return {
                type: building.getBuildingType(),
                x: building.x,
                y: building.y,
                level: building.getLevel(),
                productionProgress: building.getProductionProgress(),
            } as GameData['buildings'][number];
        });

        return {
            currencies: { ...this.currencies },
            buildings: buildingsData,
            timeSpent: Date.now() - this.gameStartTime,
        };
    }

    public loadGameData(gameData: GameData): void {
        // Clear existing buildings
        this.buildings.clear(true, true);
        // Load currencies
        this.currencies = { ...gameData.currencies };

        // Load buildings
        gameData.buildings.forEach(buildingData => {
            const building = this.buildingFactory.create(
                buildingData.type,
                buildingData.x,
                buildingData.y,
                (amountGathered: Partial<CurrencyAmount>) => {
                    this.currencies.gold += amountGathered.gold || 0;
                    this.currencies.diamonds += amountGathered.diamonds || 0;
                    this.currencies.gems += amountGathered.gems || 0;
                    this.sound.add('coin').play({ volume: 0.3 });
                },
            );

            // Set building level and progress if available
            if (buildingData.level && building.setLevel) {
                building.setLevel(buildingData.level);
            }
            if (buildingData.productionProgress && building.setProductionProgress) {
                building.setProductionProgress(buildingData.productionProgress);
            }

            this.buildings.add(building, true);
        });

        // Update game start time based on time spent
        this.gameStartTime = Date.now() - gameData.timeSpent;
    }

    public getGameData(): GameData {
        return this.serializeGameData();
    }

    private loadSavedGameData(): void {
        const savedData = gameStorage.load();
        if (savedData) {
            this.loadGameData(savedData);
        }
    }
}
