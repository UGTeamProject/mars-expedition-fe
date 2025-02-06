import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
import MenuBar from '../components/menu/MenuBar';
import '../styles.css';

function Game() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [_, _setScenes] = useState<string[]>(['MainMenu', 'Game', 'GameOver']);

    return (
        <div id="app">
            <MenuBar />
            <PhaserGame ref={phaserRef} />
        </div>
    );
}

export default Game;
