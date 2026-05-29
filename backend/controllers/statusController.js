const Restaurant = require('../models/Restaurant');
const DeliveryPartner = require('../models/DeliveryPartner');

const checkStatus = async (req, res) => {
  const { applicationId, email } = req.body;

  if (!applicationId || !email) {
    return res.status(400).json({ message: 'Application ID and Email are required' });
  }

  try {
    // Check Restaurants
    const restaurant = await Restaurant.findOne({ _id: applicationId, email: email });
    if (restaurant) {
      return res.json({ 
        type: 'Restaurant',
        name: restaurant.name,
        status: restaurant.status,
        date: restaurant.createdAt
      });
    }

    // Check Delivery Partners
    const partner = await DeliveryPartner.findOne({ _id: applicationId, email: email });
    if (partner) {
      return res.json({ 
        type: 'Delivery Partner',
        name: partner.fullName,
        status: partner.status,
        date: partner.createdAt
      });
    }

    return res.status(404).json({ message: 'No application found with these details.' });
  } catch (error) {
    console.error(error);
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'No application found with these details.' });
    }
    res.status(500).json({ message: 'Server error while checking status' });
  }
};

module.exports = { checkStatus };
