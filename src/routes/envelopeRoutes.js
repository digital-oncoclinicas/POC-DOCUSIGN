const express = require('express');
const router = express.Router();
const envelopeController = require('../controllers/envelopeController');

router.post('/send', envelopeController.sendEnvelope);

module.exports = router;
