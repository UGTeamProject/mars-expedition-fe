import { Boot } from './scenes/Boot';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { MainGame } from './scenes/MainGame.ts';

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1280,
    height: 640,
    parent: 'game-container',
    scene: [Boot, Preloader, MainMenu, MainGame],
    input: {
        mouse: true,
    },
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;
