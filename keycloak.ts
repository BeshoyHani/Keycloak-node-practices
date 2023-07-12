import KcAdminClient from '@keycloak/keycloak-admin-client';
import { RoleMappingPayload } from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation.js';


const ConnectionConfig = {
    realmName: 'test',
    baseUrl: 'http://localhost:8080',
}

const kcAdminClient = new KcAdminClient(ConnectionConfig);
export default kcAdminClient;
