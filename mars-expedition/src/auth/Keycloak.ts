import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: `${process.env.VITE_KEYCLOAK_URL}`,
    realm: 'mars',
    clientId: 'mars-expedition-fe',
});

export default keycloak;
