import kcAdminClient from './keycloak.js';
import { RoleMappingPayload } from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation.js';
import express from 'express';

const app = express();
const PORT = 3000;

app.use('/', async (req, res) => {
    try {
        const result = await kcAdminClient.auth({
            username: 'admin',
            password: 'admin',
            grantType: 'password',
            clientId: 'keycloak_node_test_app',
            totp: '123456', // optional Time-based One-time Password if OTP is required in authentication flow
        });
        const user = await kcAdminClient.users.find({email: 'beshoy.hani.26@gmail.com'})
        const roles = await kcAdminClient.roles.findOneByName({name: 'STUDENT'});
        await kcAdminClient.users.addRealmRoleMappings({
            id: user[0].id as string,
            roles:[roles] as RoleMappingPayload[],
            realm: 'test'
        })
        res.json({ result,  user, roles})
        console.log(result)

    } catch (error) {
        res.json(error)
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})