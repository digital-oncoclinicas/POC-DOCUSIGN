require('dotenv').config();
const express = require('express');
const envelopeRoutes = require('./routes/envelopeRoutes');

const app = express();
app.use(express.json());

app.use('/api/envelopes', envelopeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});