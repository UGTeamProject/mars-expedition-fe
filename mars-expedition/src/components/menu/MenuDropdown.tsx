import { Dropdown, DropdownButton } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import './menu.css';
import { useKeycloak } from '@react-keycloak/web';

function MenuDropdown() {
    const { keycloak } = useKeycloak();
    const username = keycloak.tokenParsed?.preferred_username;

    return (
        <DropdownButton id="menu-dropdown" size="lg" title={username || 'Guest'}>
            <Dropdown.Item as={NavLink} to="/settings">
                Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="log-out-btn" onClick={() => keycloak.logout({redirectUri: 'http://localhost:8082/',})}>
                Log out
            </Dropdown.Item>
        </DropdownButton>
    );
}

export default MenuDropdown;
