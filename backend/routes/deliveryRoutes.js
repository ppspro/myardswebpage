const express = require('express');
const router = express.Router();
const { registerDeliveryPartner, getDeliveryPartners, updateDeliveryPartnerStatus } = require('../controllers/deliveryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', upload.fields([
  { name: 'aadhaarCard', maxCount: 1 },
  { name: 'panCard', maxCount: 1 },
  { name: 'drivingLicense', maxCount: 1 },
  { name: 'rcBook', maxCount: 1 }
]), registerDeliveryPartner);

router.get('/', protect, getDeliveryPartners);
router.put('/:id/status', protect, updateDeliveryPartnerStatus);

module.exports = router;
