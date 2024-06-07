const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.post('/validate-token', (req, res) => {
  const token = req.body;
  if (token) {
    setTimeout(() => {
      res.json({
        data: [
          {
            vendor: 'TENABLE',
            logo_url:
              'https://pbs.twimg.com/profile_images/1410604377757216768/ocEKYniC_400x400.jpg',
            docs_url: 'https://docs.leen.dev/integrations/tenable-credential',
            dataSchema: {
              type: 'object',
              properties: {
                client_key: {
                  type: 'string',
                  description: 'Tenable Client Key',
                },
                secret_key: {
                  type: 'string',
                  description: 'Tenable Secret Key',
                },
              },
              required: ['client_key', 'secret_key'],
            },
            uiSchema: {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/client_key',
                },
                {
                  type: 'Control',
                  scope: '#/properties/secret_key',
                },
              ],
            },
          },
          {
            vendor: 'CROWDSTRIKE',
            logo_url:
              'https://pbs.twimg.com/profile_images/1451022302578049024/6L-zG5oq_400x400.jpg',
            docs_url:
              'https://docs.leen.dev/integrations/crowdstrike-credential',
            dataSchema: {
              type: 'object',
              properties: {
                client_id: {
                  type: 'string',
                  description: 'Crowdstrike Client ID',
                },
                client_secret: {
                  type: 'string',
                  description: 'Crowdstrike Client Secret',
                },
                base_url: {
                  type: 'string',
                  description: 'Crowdstrike Base URL',
                },
              },
              required: ['client_id', 'client_secret', 'base_url'],
            },
            uiSchema: {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/client_id',
                },
                {
                  type: 'Control',
                  scope: '#/properties/client_secret',
                },
                {
                  type: 'Control',
                  scope: '#/properties/base_url',
                },
              ],
            },
          },
        ],
      });
    }, 1000);
  }
});

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
        "oauth2_authorize_url": "<string>",
        "identifier": "<string>"
      });
    }, 3000);
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
