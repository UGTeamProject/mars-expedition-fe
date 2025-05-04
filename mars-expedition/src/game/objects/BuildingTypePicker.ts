import { GameObjects } from 'phaser';
import { BuildingType } from './Building/BuildingFactory.ts';

export class BuildingTypePicker extends GameObjects.Rectangle {
    private goldMine: Phaser.GameObjects.Sprite;
    private diamondMine: Phaser.GameObjects.Sprite;
    private gemMine: Phaser.GameObjects.Sprite;
    private selectedBuildingType: BuildingType | undefined;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.goldMine = scene.add
            .sprite(x, y + 15, 'goldMine')
            .setScrollFactor(0)
            .setDepth(1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.selectedBuildingType === 'goldMine'
                    ? (this.selectedBuildingType = undefined)
                    : (this.selectedBuildingType = 'goldMine');
            });
        this.diamondMine = scene.add
            .sprite(x + 100, y + 15, 'diamondMine')
            .setScrollFactor(0)
            .setDepth(1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.selectedBuildingType === 'diamondMine'
                    ? (this.selectedBuildingType = undefined)
                    : (this.selectedBuildingType = 'diamondMine');
            });
        this.gemMine = scene.add
            .sprite(x + 200, y + 15, 'gemMine')
            .setScrollFactor(0)
            .setDepth(1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.selectedBuildingType === 'gemMine'
                    ? (this.selectedBuildingType = undefined)
                    : (this.selectedBuildingType = 'gemMine');
            });
        this.setScrollFactor(0);
    }

    update(time: number, delta: number) {
        super.update(time, delta);
        this.goldMine.setTint(this.selectedBuildingType === 'goldMine' ? 0x00ff00 : 0xffffff);
        this.diamondMine.setTint(this.selectedBuildingType === 'diamondMine' ? 0x00ff00 : 0xffffff);
        this.gemMine.setTint(this.selectedBuildingType === 'gemMine' ? 0x00ff00 : 0xffffff);
    }

    getSelectedBuildingType(): BuildingType | undefined {
        return this.selectedBuildingType;
    }
}
