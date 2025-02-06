import { Dropdown, DropdownButton } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import './menu.css';

function MenuDropdown() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <DropdownButton id="menu-dropdown" size="lg" title={username || 'Guest'}>
            <Dropdown.Item as={NavLink} to="/settings">
                Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="log-out-btn" onClick={handleLogout}>
                Log out
            </Dropdown.Item>
        </DropdownButton>
    );
}

export default MenuDropdown;
