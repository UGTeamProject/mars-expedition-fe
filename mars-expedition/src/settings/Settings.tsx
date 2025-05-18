import { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useNotification } from '../components/notification/NotificationContext';
import axios from 'axios';
import MenuBar from '../components/menu/MenuBar';
import Button from '@mui/material/Button';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../components/dialog/ConfirmDialog';
import './settings.css';

function Settings() {
    const { keycloak } = useKeycloak();
    const { show } = useNotification();
    const [open, setOpen] = useState(false);

    const handleGameReset = async () => {
        try {
            await axios.delete(`${process.env.VITE_BACKEND_URL}/api/game-session/delete`, {
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
                        href={`${process.env.VITE_KEYCLOAK_URL}/realms/mars/account`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Manage your account
                    </Button>
                </div>
                <div className="delete">
                    <h2>Game progress</h2>
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
