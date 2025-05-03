import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'mars',
    clientId: 'mars-expedition-fe',
});

export default keycloak;
