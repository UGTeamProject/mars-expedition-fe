import { GameObjects } from 'phaser';
import { CurrencyAmount } from './Building/types.ts';

export class CurrencyBar extends GameObjects.Sprite {
    private currencies: CurrencyAmount = {
        gold: 0,
        diamonds: 0,
        gems: 0,
    };
    private goldAmount: Phaser.GameObjects.Text;
    private diamondAmount: Phaser.GameObjects.Text;
    private gemAmount: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number, textureName: string = 'currencyBar') {
        super(scene, x, y, textureName);
        this.goldAmount = scene.add.text(x + 100, y + 15, CurrencyBar.currencyAsText(this.currencies.gold), {
            fontSize: '42px',
            color: '#ffffff',
            fontFamily: 'Pixelify Sans',
        });
        this.goldAmount.setScrollFactor(0);
        this.goldAmount.setDepth(1);
        this.diamondAmount = scene.add.text(x + 450, y + 15, CurrencyBar.currencyAsText(this.currencies.diamonds), {
            fontSize: '42px',
            color: '#ffffff',
            fontFamily: 'Pixelify Sans',
        });
        this.diamondAmount.setScrollFactor(0);
        this.diamondAmount.setDepth(1);
        this.gemAmount = scene.add.text(x + 800, y + 15, CurrencyBar.currencyAsText(this.currencies.gems), {
            fontSize: '42px',
            color: '#ffffff',
            fontFamily: 'Pixelify Sans',
        });
        this.gemAmount.setScrollFactor(0);
        this.gemAmount.setDepth(1);
        this.setScrollFactor(0);
        this.setOrigin(0, 0);
    }

    update(time: number, delta: number) {
        super.update(time, delta);
    }

    updateValues(currencies: CurrencyAmount) {
        this.currencies = currencies;
        this.goldAmount.setText(CurrencyBar.currencyAsText(this.currencies.gold));
        this.diamondAmount.setText(CurrencyBar.currencyAsText(this.currencies.diamonds));
        this.gemAmount.setText(CurrencyBar.currencyAsText(this.currencies.gems));
    }

    static currencyAsText(value: number): string {
        return String(value).padStart(6, '0');
    }
}
