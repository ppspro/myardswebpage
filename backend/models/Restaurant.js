const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  kyc: {
    fssaiLicenseNumber: { type: String, required: true },
    gstin: { type: String, required: true },
    pan: { type: String, required: true },
    bankDetails: {
      accountNumber: { type: String, required: true },
      ifsc: { type: String, required: true },
      bankName: { type: String, required: true }
    }
  },
  documents: {
    fssaiCertificate: { type: String, required: true },
    cancelledCheque: { type: String, required: true },
    ownerPanAadhaar: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
