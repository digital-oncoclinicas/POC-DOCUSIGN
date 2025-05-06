const docusignService = require('../services/docusignService');

exports.sendEnvelope = async (req, res) => {
  console.log(req.body, res)
  try {
    const { recipientEmail, recipientName } = req.body;
    const envelopeId = await docusignService.sendEnvelope(recipientEmail, recipientName);
    res.status(200).json({ envelopeId });
  } catch (error) {
    console.error('Erro ao enviar envelope:', error);
    res.status(500).json({ error: 'Erro ao enviar envelope' });
  }
};