const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({message: 'Hello, World!'});
});

app.post('/provisioning/organizations/:organization_id/connection-invite-token/validate', (req, res) => {
    if (req.body.token) {
        setTimeout(() => {
            res.json([{
                vendor: 'SENTINELONE',
                vendorName: 'SentinelOne',
                logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyRIda6Q6lOqBXWB7jzz7gAsLDLcB9WJr_69Ci7tkgr0UkhydQYTIhmL77UX7nY1QfFZA&usqp=CAU',
                docsUrl: 'https://docs.leen.dev/integrations/tenable-credential',
                credentialsType: "Secrets",
                dataSchema: {
                    type: 'object', properties: {
                        client_url: {
                            type: 'string', description: 'SentinelOne Client URL', minLength: 1
                        }, client_key: {
                            type: 'string', password: true, description: 'SentinelOne Client Key', minLength: 1
                        }, secret_key: {
                            type: 'string', password: true, description: 'SentinelOne Secret Key', minLength: 1
                        },
                    }, required: ['client_url', 'client_key', 'secret_key'],
                },
                uiSchema: {
                    type: 'VerticalLayout', elements: [{
                        type: 'Control', scope: '#/properties/client_url',
                    }, {
                        type: 'Control', scope: '#/properties/client_key',
                    }, {
                        type: 'Control', scope: '#/properties/secret_key',
                    },],
                },
            }],);
        }, 1000);
    }
});

const getAuthUrl = (authUrl) => {
    const redirectUri = 'https://api.incubyte.appmixer.cloud/auth/google/callback';
    const scopes = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile',];

    return `${authUrl}?client_id=777752744263-1n0fvs7vj0gd4hsnimhcvhmsh7p0f6m3.apps.googleusercontent.com&redirect_uri=${redirectUri}&scope=${scopes.join(' ',)}&response_type=code&access_type=offline`;
};

app.post('/provisioning/organizations/:organizationId/connections', (req, res) => {
    const body = req.body;

    const orgId = req.params['organizationId'];
    if (body && orgId) {
        setTimeout(() => {
            res.json({
                "id": orgId,
                "vendor": body?.vendor,
                "refresh_interval_secs": 123,
                "timeout_secs": 123,
                "organization_id": orgId,
                "identifier": "<string>"
            });
        }, 3000);
    }
});


let requestCount = 0;

app.get('/provisioning/organizations/:organizationId/connections/:connectionId', (req, res) => {
    requestCount++;
    const isOAuthConnectionCreated = requestCount % 5 === 0;

    setTimeout(() => {
        res.json({
            "is_active": isOAuthConnectionCreated,
        });
    }, 500);
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
