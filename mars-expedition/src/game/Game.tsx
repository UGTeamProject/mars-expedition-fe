import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
import { Dropdown } from 'react-bootstrap';
import MenuBar from '../components/menu/MenuBar';
import '../styles.css';

function Game() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [scenes, _setScenes] = useState<string[]>(['MainMenu', 'Game', 'GameOver']);

    return (
        <div id="app">
            <MenuBar />
            <PhaserGame ref={phaserRef} />
            <div className={'debugMenu'}>
                <Dropdown
                    onKeyDown={e => {
                        e.preventDefault();
                    }}
                >
                    <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        onKeyDown={e => {
                            e.preventDefault();
                        }}
                    >
                        Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {scenes.map(scene => (
                            <Dropdown.Item
                                key={scene}
                                onClick={() => {
                                    phaserRef.current?.scene?.scene.start(scene);
                                }}
                            >
                                {scene}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default Game;
