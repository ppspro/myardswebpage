const Restaurant = require('../models/Restaurant');
const { sendRegistrationEmail, sendVerificationResultEmail } = require('../utils/emailService');
const { extractTextFromFile, shouldAutoApprove } = require('../utils/ocrService');

const registerRestaurant = async (req, res) => {
  try {
    const { name, address, contactPerson, phone, email, fssaiLicenseNumber, gstin, pan, accountNumber, ifsc, bankName } = req.body;

    const files = req.files;
    if (!files || !files['fssaiCertificate'] || !files['cancelledCheque'] || !files['ownerPanAadhaar']) {
      return res.status(400).json({ message: 'Missing required KYC documents' });
    }

    const restaurant = new Restaurant({
      name, address, contactPerson, phone, email,
      kyc: { fssaiLicenseNumber, gstin, pan, bankDetails: { accountNumber, ifsc, bankName } },
      documents: {
        fssaiCertificate: files['fssaiCertificate'][0].path,
        cancelledCheque: files['cancelledCheque'][0].path,
        ownerPanAadhaar: files['ownerPanAadhaar'][0].path
      }
    });

    await restaurant.save();
    
    // Send registration email
    await sendRegistrationEmail(email, contactPerson, restaurant._id, 'Restaurant');
    
    res.status(201).json({ message: 'Restaurant registration submitted successfully' });

    // Background OCR Process for Smart Auto-Approval
    (async () => {
      try {
        console.log(`Starting background OCR for Restaurant: ${restaurant._id}`);
        const fssaiText = await extractTextFromFile(restaurant.documents.fssaiCertificate);
        const panText = await extractTextFromFile(restaurant.documents.ownerPanAadhaar);
        
        const docsToMatch = [
          { text: fssaiText, target: fssaiLicenseNumber },
          { text: panText, target: pan }
        ];

        if (shouldAutoApprove(docsToMatch)) {
          console.log(`Smart OCR Approved Restaurant: ${restaurant._id}`);
          restaurant.status = 'Approved';
          await restaurant.save();
          await sendVerificationResultEmail(email, contactPerson, 'Approved', 'Restaurant');
        } else {
          console.log(`Smart OCR did not find enough matches for Restaurant: ${restaurant._id}. Left as Pending.`);
        }
      } catch (err) {
        console.error('OCR Background Process Failed:', err);
      }
    })();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateRestaurantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    restaurant.status = status;
    await restaurant.save();
    
    // Send verification result email
    await sendVerificationResultEmail(restaurant.email, restaurant.contactPerson, status, 'Restaurant');
    
    res.json({ message: 'Status updated', restaurant });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerRestaurant, getRestaurants, updateRestaurantStatus };
