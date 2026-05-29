const express = require('express');
const router = express.Router();
const { registerRestaurant, getRestaurants, updateRestaurantStatus } = require('../controllers/restaurantController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', upload.fields([
  { name: 'fssaiCertificate', maxCount: 1 },
  { name: 'cancelledCheque', maxCount: 1 },
  { name: 'ownerPanAadhaar', maxCount: 1 }
]), registerRestaurant);

router.get('/', protect, getRestaurants);
router.put('/:id/status', protect, updateRestaurantStatus);

module.exports = router;
