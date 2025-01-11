import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
import { Button, Dropdown } from 'react-bootstrap';
import MenuBar from '../components/menu/MenuBar';
import '../styles.css';

function Game() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [scenes, _setScenes] = useState<string[]>(['MainMenu', 'Game', 'GameOver']);

    const addSprite = () => {
        if (phaserRef.current) {
            const scene = phaserRef.current.scene;

            if (scene) {
                // Add more stars
                const x = Phaser.Math.Between(64, scene.scale.width - 64);
                const y = Phaser.Math.Between(64, scene.scale.height - 64);

                //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
                const star = scene.add.sprite(x, y, 'star');

                //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
                //  You could, of course, do this from within the Phaser Scene code, but this is just an example
                //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
                scene.add.tween({
                    targets: star,
                    duration: 500 + Math.random() * 1000,
                    alpha: 0,
                    yoyo: true,
                    repeat: -1,
                });
            }
        }
    };

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

                <Button onClick={addSprite}>Add New Sprite</Button>
            </div>
        </div>
    );
}

export default Game;
