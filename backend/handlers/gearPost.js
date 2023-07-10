const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
require('dotenv').config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// MongoDB URI
const uri = process.env.MONGO_URI;
const dbName = 'EorzeanArmory';

async function addGearToUserHandler(req, res) {
  try {
    const userId = req.params.userId;
    const { id, icon, name } = req.body;

    // Connect to MongoDB
    const client = new MongoClient(uri, options);
    await client.connect();
    const db = client.db(dbName);

    // Update the user document with the new gear
    const result = await db.collection('users').updateOne(
      { _id: userId },
      { $push: { gear: { id, icon, name } } }
    );

    // Close the MongoDB connection
    client.close();

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'Gear added to user successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { addGearToUserHandler };