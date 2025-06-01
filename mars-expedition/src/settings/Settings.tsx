import { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useNotification } from '../components/notification/NotificationContext';
import axios from 'axios';
import MenuBar from '../components/menu/MenuBar';
import Button from '@mui/material/Button';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import ConfirmDialog from '../components/dialog/ConfirmDialog';
import { api } from '../services/api';
import { gameStorage } from '../services/gameStorage';
import { GameData } from '../types/game';
import './settings.css';

function Settings() {
    const { keycloak } = useKeycloak();
    const { show } = useNotification();
    const [open, setOpen] = useState(false);
    const [loadingFromBackend, setLoadingFromBackend] = useState(false);

    const handleGameReset = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/game-session/delete`, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            });
            setOpen(false);
            show('Progress was reset successfully', 'success');
        } catch (_) {
            show('Failed to reset progress', 'error');
        }
    };

    const handleLoadFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = e => {
            try {
                const gameData: GameData = JSON.parse(e.target?.result as string);
                gameStorage.save(gameData);
                console.log('Loaded game data from file:', gameData);
                show('Game loaded successfully from file. Restart the game to apply changes.', 'success');
            } catch (error) {
                console.log('Failed to load game from file:', error);
                show('Failed to load game from file. Invalid JSON format.', 'error');
            }
        };
        reader.readAsText(file);

        // Reset the input value so the same file can be selected again
        event.target.value = '';
    };

    const handleLoadFromBackend = async () => {
        setLoadingFromBackend(true);
        try {
            const response = await api.get<GameData>('/game-session/state', {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            });
            gameStorage.save(response.data);
            show('Game loaded successfully from backend. Restart the game to apply changes.', 'success');
        } catch (error) {
            show('Failed to load game from backend', 'error');
        } finally {
            setLoadingFromBackend(false);
        }
    };

    const handleExportCurrentGame = () => {
        const currentGameData = gameStorage.load();
        if (!currentGameData) {
            show('No game data to export', 'warning');
            return;
        }

        const dataStr = JSON.stringify(currentGameData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `mars-expedition-save-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        show('Game data exported successfully', 'success');
    };

    const handleClearGameData = () => {
        gameStorage.clear();
        show('Game data cleared. Restart the game to see changes.', 'success');
    };

    return (
        <div className="settings-page">
            <MenuBar />
            <div className="settings">
                <div className="account">
                    <h2>Account</h2>
                    <p>Change your username or e-mail or fully delete your account.</p>
                    <p>
                        <b>WARNING!</b>
                        After changes in the Account Console, you need to manually refresh this page to see results.
                    </p>
                    <Button
                        id="settings-btn"
                        data-testid={'manage-account-button'}
                        variant="contained"
                        color="primary"
                        startIcon={<ManageAccountsIcon />}
                        component="a"
                        href={`${import.meta.env.VITE_KEYCLOAK_URL}/realms/mars/account`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Manage your account
                    </Button>
                </div>
                <div className="game-data">
                    <h2>Game progress</h2>
                    <p>Load your game progress from a file or from the latest saved state.</p>

                    <div className="load-section">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleLoadFromFile}
                            style={{ display: 'none' }}
                            id="load-file-input"
                        />
                        <label htmlFor="load-file-input">
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<UploadIcon />}
                                component="span"
                                style={{ marginRight: '10px' }}
                            >
                                Load from file
                            </Button>
                        </label>

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<DownloadIcon />}
                            onClick={handleLoadFromBackend}
                            disabled={loadingFromBackend}
                            style={{ marginRight: '10px' }}
                        >
                            {loadingFromBackend ? 'Loading...' : 'Load latest saved'}
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<SaveIcon />}
                            onClick={handleExportCurrentGame}
                            style={{ marginRight: '10px' }}
                        >
                            Export current
                        </Button>

                        <Button
                            variant="outlined"
                            color="warning"
                            startIcon={<ClearIcon />}
                            onClick={handleClearGameData}
                        >
                            Clear saved data
                        </Button>
                    </div>
                </div>

                <div className="delete">
                    <h2>Reset progress</h2>
                    <p>Reset your game progress to start from the beginning.</p>
                    <Button
                        id="settings-btn"
                        data-testid={'reset-button'}
                        variant="contained"
                        color="warning"
                        startIcon={<DeleteIcon />}
                        onClick={() => setOpen(true)}
                    >
                        Reset progress
                    </Button>
                    <ConfirmDialog
                        title="Progress reset"
                        content="Are you sure you want to reset your progress? This action is irreversible."
                        open={open}
                        onClose={() => setOpen(false)}
                        onYes={handleGameReset}
                        data-testid={'reset-dialog'}
                    />
                </div>
            </div>
        </div>
    );
}

export default Settings;
