const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({message: 'Hello, World!'});
});

app.post('/validate-token', (req, res) => {
    if (req.body.token) {
        setTimeout(() => {
            res.json({
                data: [{
                    vendor: 'SENTINELONE',
                    vendorDisplayName: 'SentinelOne',
                    logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyRIda6Q6lOqBXWB7jzz7gAsLDLcB9WJr_69Ci7tkgr0UkhydQYTIhmL77UX7nY1QfFZA&usqp=CAU',
                    docs_url: 'https://docs.leen.dev/integrations/tenable-credential',
                    dataSchema: {
                        type: 'object', properties: {
                            client_url: {
                                type: 'string', description: 'SentinelOne Client URL', minLength: 1
                            }, client_key: {
                                type: 'string', password: true, description: 'SentinelOne Client Key', minLength: 1
                            }, secret_key: {
                                type: 'string', description: 'SentinelOne Secret Key', minLength: 1
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
                }, {
                    vendor: 'NETSKOPE',
                    vendorDisplayName: 'Netskope',
                    logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdqEK-WXpvh35ZY_5hwMkoRkfRSK-6DWfPLMw9tlbgMVojT6M62GLktJ9MfA&s',
                    docs_url: 'https://docs.leen.dev/integrations/tenable-credential',
                    dataSchema: {
                        type: 'object', properties: {
                            client_key: {
                                type: 'string', description: 'Netskope Client Key', minLength: 1
                            }, secret_key: {
                                type: 'string', description: 'Netskope Secret Key', minLength: 1
                            },
                        }, required: ['client_key', 'secret_key'],
                    },
                    uiSchema: {
                        type: 'VerticalLayout', elements: [{
                            type: 'Control', scope: '#/properties/client_key',
                        }, {
                            type: 'Control', scope: '#/properties/secret_key',
                        },],
                    },
                }, {
                    vendor: 'TENABLE',
                    vendorDisplayName: 'Tenable',
                    logo_url: 'https://pbs.twimg.com/profile_images/1410604377757216768/ocEKYniC_400x400.jpg',
                    docs_url: 'https://docs.leen.dev/integrations/tenable-credential',
                    dataSchema: {
                        type: 'object', properties: {
                            client_key: {
                                type: 'string', description: 'Tenable Client Key', minLength: 1
                            }, secret_key: {
                                type: 'string', description: 'Tenable Secret Key', minLength: 1
                            },
                        }, required: ['client_key', 'secret_key'],
                    },
                    uiSchema: {
                        type: 'VerticalLayout', elements: [{
                            type: 'Control', scope: '#/properties/client_key',
                        }, {
                            type: 'Control', scope: '#/properties/secret_key',
                        },],
                    },
                }, {
                    vendor: 'CROWDSTRIKE',
                    vendorDisplayName: 'CrowdStrike',
                    logo_url: 'https://pbs.twimg.com/profile_images/1451022302578049024/6L-zG5oq_400x400.jpg',
                    docs_url: 'https://docs.leen.dev/integrations/crowdstrike-credential',
                    dataSchema: {
                        type: 'object', properties: {
                            client_id: {
                                type: 'string', description: 'CrowdStrike Client ID', minLength: 1
                            }, client_secret: {
                                type: 'string', description: 'CrowdStrike Client Secret', minLength: 1
                            }, base_url: {
                                type: 'string', description: 'CrowdStrike Base URL', minLength: 1
                            },
                        }, required: ['client_id', 'client_secret', 'base_url'],
                    },
                    uiSchema: {
                        type: 'VerticalLayout', elements: [{
                            type: 'Control', scope: '#/properties/client_id',
                        }, {
                            type: 'Control', scope: '#/properties/client_secret',
                        }, {
                            type: 'Control', scope: '#/properties/base_url',
                        },],
                    },
                }, {
                    vendor: 'QUALYS',
                    vendorDisplayName: 'Qualys',
                    logo_url: 'https://s3-symbol-logo.tradingview.com/qualys--big.svg',
                    docs_url: 'https://docs.leen.dev/integrations/crowdstrike-credential',
                    dataSchema: {
                        type: 'object', properties: {
                            api_key: {
                                type: 'string', description: 'Qualys API Key', minLength: 1
                            }
                        }, required: ['api_key'],
                    },
                    uiSchema: {
                        type: 'VerticalLayout', elements: [{
                            type: 'Control', scope: '#/properties/api_key',
                        }],
                    },
                }],
            });
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
                "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
                "vendor": body?.vendor,
                "refresh_interval_secs": 123,
                "timeout_secs": 123,
                "organization_id": orgId,
                "oauth2_authorize_url": getAuthUrl('https://accounts.google.com/o/oauth2/v2/auth'),
                "identifier": "<string>"
            });
        }, 3000);
    }
});


let requestCount = 0;

app.get('/poll', (req, res) => {
    requestCount++;

    const isOAuthConnectionCreated = requestCount % 5 === 0;

    setTimeout(() => {
        res.json({
            "isOAuthConnectionCreated": isOAuthConnectionCreated,
        });
    }, 500);
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
