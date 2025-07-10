const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { apiKey, secretKey } = require('../utils/config');

// Endpoint: /api/callback
router.post('/callback', (req, res) => {
  const data = req.body;
  const signatureHeader = req.headers['x-callback-signature'];

  const { ref_kode, nominal, status } = data;
  const generatedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(ref_kode + apiKey + nominal)
    .digest('hex');

  if (generatedSignature !== signatureHeader) {
    console.log('❌ Signature tidak valid:', signatureHeader);
    return res.status(403).send('Invalid signature');
  }

  console.log('📩 Callback diterima:');
  console.log(data);

  if (status === 'success') {
    // 👉 Aksi jika pembayaran berhasil:
    // Misal: update database, tambah saldo user
    console.log(`✅ Pembayaran berhasil untuk ${ref_kode} - Rp${nominal}`);
  } else {
    console.log(`⚠️ Status transaksi: ${status}`);
  }

  res.status(200).send('Callback received');
});

module.exports = router;