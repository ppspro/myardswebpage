const DeliveryPartner = require('../models/DeliveryPartner');
const { sendRegistrationEmail, sendVerificationResultEmail } = require('../utils/emailService');
const { extractTextFromFile, shouldAutoApprove } = require('../utils/ocrService');

const registerDeliveryPartner = async (req, res) => {
  try {
    const { fullName, phone, email, address, vehicleType, vehicleNumber, aadhaarNumber, panNumber, drivingLicenseNumber } = req.body;

    const files = req.files;
    if (!files || !files['aadhaarCard'] || !files['panCard'] || !files['drivingLicense'] || !files['rcBook']) {
      return res.status(400).json({ message: 'Missing required KYC documents' });
    }

    const partner = new DeliveryPartner({
      fullName, phone, email, address,
      vehicleInfo: { type: vehicleType, vehicleNumber },
      kyc: { aadhaarNumber, panNumber, drivingLicenseNumber },
      documents: {
        aadhaarCard: files['aadhaarCard'][0].path,
        panCard: files['panCard'][0].path,
        drivingLicense: files['drivingLicense'][0].path,
        rcBook: files['rcBook'][0].path
      }
    });

    await partner.save();
    
    // Send registration email
    await sendRegistrationEmail(email, fullName, partner._id, 'Delivery Partner');
    
    res.status(201).json({ message: 'Delivery Partner registration submitted successfully' });

    // Background OCR Process for Smart Auto-Approval
    (async () => {
      try {
        console.log(`Starting background OCR for Delivery Partner: ${partner._id}`);
        const panText = await extractTextFromFile(partner.documents.panCard);
        const dlText = await extractTextFromFile(partner.documents.drivingLicense);
        const rcText = await extractTextFromFile(partner.documents.rcBook);
        
        const docsToMatch = [
          { text: panText, target: panNumber },
          { text: dlText, target: drivingLicenseNumber },
          { text: rcText, target: vehicleNumber }
        ];

        if (shouldAutoApprove(docsToMatch)) {
          console.log(`Smart OCR Approved Delivery Partner: ${partner._id}`);
          partner.status = 'Approved';
          await partner.save();
          await sendVerificationResultEmail(email, fullName, 'Approved', 'Delivery Partner');
        } else {
          console.log(`Smart OCR did not find enough matches for Delivery Partner: ${partner._id}. Left as Pending.`);
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

const getDeliveryPartners = async (req, res) => {
  try {
    const partners = await DeliveryPartner.find({});
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateDeliveryPartnerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const partner = await DeliveryPartner.findById(id);
    if (!partner) return res.status(404).json({ message: 'Delivery Partner not found' });

    partner.status = status;
    await partner.save();
    
    // Send verification result email
    await sendVerificationResultEmail(partner.email, partner.fullName, status, 'Delivery Partner');
    
    res.json({ message: 'Status updated', partner });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerDeliveryPartner, getDeliveryPartners, updateDeliveryPartnerStatus };
