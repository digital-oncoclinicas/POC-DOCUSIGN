# POC DocuSign Node.js

## Objetivo

POC para integrar e enviar documentos para assinatura eletrônica usando DocuSign via API REST com Node.js.

## Tecnologias usadas
- Node.js
- Express.js
- DocuSign eSign SDK
- dotenv

## Pré-requisitos
- Conta na DocuSign
- Integrator Key (Client ID)
- User ID
- Private Key em base64
- Account ID

## Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/felipe-oncoclinicas/POC-DOCUSIGN.git
```

2. Instale as dependências:

```bash
npm install
```

3. Configure seu `.env` com as variáveis do DocuSign:

```env
DOCUSIGN_INTEGRATOR_KEY=SEU_CLIENT_ID
DOCUSIGN_USER_ID=SEU_USER_GUID
DOCUSIGN_AUTH_SERVER=https://account.docusign.com
DOCUSIGN_PRIVATE_KEY=SUA_CHAVE_PRIVADA_EM_BASE64
DOCUSIGN_ACCOUNT_ID=SEU_ACCOUNT_ID
DOCUSIGN_BASE_PATH=https://demo.docusign.net/restapi
```

4. Rode o servidor:

```bash
npm start
```

5. Teste o envio de um envelope:

Use o Postman para enviar uma requisição:

POST `http://localhost:3000/api/envelopes/send`

Body (JSON):
```json
{
  "recipientEmail": "email@destinatario.com",
  "recipientName": "Nome Destinatário"
}
```

## Como testar a POC Node.js + DocuSign

### 1. Rodar o servidor

```bash
npm start
```

Servidor disponível em:
```bash
http://localhost:3000
```

### 2. Testar o envio do envelope

#### URL
```
http://localhost:3000/api/envelopes/send
```

#### Headers
```
Content-Type: application/json
```

#### Body (JSON)
```json
{
  "recipientEmail": "email-do-destinatario@exemplo.com",
  "recipientName": "Nome do Destinatário"
}
```

### 3. Exemplo usando cURL

```bash
curl --request POST \
  --url http://localhost:3000/api/envelopes/send \
  --header 'Content-Type: application/json' \
  --data '{
    "recipientEmail": "email-do-destinatario@exemplo.com",
    "recipientName": "Nome do Destinatário"
}'
```

### 4. Possível resposta
```json
{
  "envelopeId": "abcdef12-3456-7890-abcd-ef1234567890"
}
```

O destinatário receberá um e-mail da DocuSign solicitando a assinatura.

## Dicas de Debug

| Situação | Solução |
|:---------|:--------|
| `invalid_grant` ou erro de token | Revise a Private Key e os dados do `.env` |
| `account_not_found` | Confira se o `ACCOUNT_ID` está correto |
| Problemas de porta | Veja se já tem algo rodando na `porta 3000` |
| Erros de autenticação | Confirme que seu integrador está configurado para **JWT** no painel da DocuSign |

## Observação
Esse exemplo usa autenticação JWT, ideal para integrações de servidor para servidor sem interação do usuário final.

Para ambientes de produção, atente-se à segurança da chave privada!

## Melhorias futuras (opcionais)

- [ ] Enviar documentos PDF reais em vez de textos
- [ ] Assinar você mesmo (fluxo de auto-assinatura)
- [ ] Consultar o status de envio de um envelope
