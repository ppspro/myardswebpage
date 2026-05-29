const mongoose = require('mongoose');

const deliveryPartnerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  vehicleInfo: {
    type: { type: String, enum: ['Bike', 'Scooter', 'Bicycle'], required: true },
    vehicleNumber: { type: String }
  },
  kyc: {
    aadhaarNumber: { type: String, required: true },
    panNumber: { type: String, required: true },
    drivingLicenseNumber: { type: String, required: true }
  },
  documents: {
    aadhaarCard: { type: String, required: true },
    panCard: { type: String, required: true },
    drivingLicense: { type: String, required: true },
    rcBook: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true });

const DeliveryPartner = mongoose.model('DeliveryPartner', deliveryPartnerSchema);
module.exports = DeliveryPartner;
