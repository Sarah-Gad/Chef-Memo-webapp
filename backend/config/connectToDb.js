const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CLOUD_URI);
    console.log('connected to the database');
  } catch (error) {
    console.log('connection failed to the database', error);
  }
};
