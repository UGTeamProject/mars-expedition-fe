import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ConfirmDialog from '../dialog/ConfirmDialog';
import './menu.css';

function MenuDropdown() {
    const { keycloak } = useKeycloak();
    const navigate = useNavigate();
    const username = keycloak.tokenParsed?.preferred_username;
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => keycloak.logout({ redirectUri: `${process.env.VITE_FRONTEND_URL}/` });

    return (
        <div>
            <Button
                id="menu-btn"
                size="large"
                aria-controls={isOpen ? 'menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : undefined}
                onClick={handleClick}
            >
                {username}
                <ArrowDropDownIcon fontSize="large" color="inherit" />
            </Button>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            width: 210,
                        },
                    },
                }}
            >
                <MenuItem onClick={() => navigate('/settings')} data-testid={'settings-button'}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText className="menu-text">Settings</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => setOpen(true)} data-testid={'logout-button'}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" color="warning" />
                    </ListItemIcon>
                    <ListItemText color="warning">
                        <b>Log out</b>
                    </ListItemText>
                </MenuItem>
            </Menu>
            <ConfirmDialog
                title="Log out"
                content="Are you sure you want to log out?"
                open={open}
                onClose={() => setOpen(false)}
                onYes={handleLogout}
                data-testid={'logout-dialog'}
            />
        </div>
    );
}

export default MenuDropdown;
