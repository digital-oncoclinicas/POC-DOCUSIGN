const docusign = require('docusign-esign');
const fs = require('fs');

async function sendEnvelope(recipientEmail, recipientName) {
  const apiClient = new docusign.ApiClient();
  apiClient.setBasePath(process.env.DOCUSIGN_BASE_PATH);

  const jwtLifeSec = 10 * 60;
  const privateKey = Buffer.from(process.env.DOCUSIGN_PRIVATE_KEY, 'base64');

  const results = await apiClient.requestJWTUserToken(
    process.env.DOCUSIGN_INTEGRATOR_KEY,
    process.env.DOCUSIGN_USER_ID,
    'signature',
    privateKey,
    jwtLifeSec
  );

  const accessToken = results.body.access_token;
  const userInfo = await apiClient.getUserInfo(accessToken);

  const accountId = process.env.DOCUSIGN_ACCOUNT_ID;
  apiClient.addDefaultHeader('Authorization', `Bearer ${accessToken}`);

  const envelopesApi = new docusign.EnvelopesApi(apiClient);

  const envelopeDefinition = {
    emailSubject: 'Por favor, assine este documento',
    recipients: {
      signers: [
        {
          email: recipientEmail,
          name: recipientName,
          recipientId: '1',
          routingOrder: '1',
          tabs: {
            signHereTabs: [
              {
                anchorString: '/assinatura/',
                anchorUnits: 'pixels',
                anchorYOffset: '10',
                anchorXOffset: '20'
              }
            ]
          }
        }
      ]
    },

    // document
    documents: [
      {
        documentBase64: Buffer.from('Teste de assinatura via API.').toString('base64'),
        name: 'ContratoTeste.txt',
        fileExtension: 'txt',
        documentId: '1'
      }
    ],
    status: 'sent'
  };

  const resultsEnvelope = await envelopesApi.createEnvelope(accountId, { envelopeDefinition });
  return resultsEnvelope.envelopeId;
}

module.exports = { sendEnvelope };