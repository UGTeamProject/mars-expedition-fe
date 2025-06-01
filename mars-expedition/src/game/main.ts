import { Boot } from './scenes/Boot';
import { Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { MainGame } from './scenes/MainGame.ts';
import { IntroScene } from './scenes/IntroScene.ts';

const StartGame = () => {
    const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        parent: 'game-container',
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene: [Boot, Preloader, IntroScene, MainGame],
    };

    return new Game(config);
};

export default StartGame;
