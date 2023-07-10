const { MongoClient } = require('mongodb');
require('dotenv').config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// MongoDB URI
const uri = process.env.MONGO_URI;
const dbName = 'EorzeanArmory';

async function getProfileCharacters(req, res) {
  try {
    const { id } = req.params;

    const client = new MongoClient(uri, options);
    await client.connect();

    const db = client.db(dbName);

    // Find the user with the given _id
    const user = await db.collection('users').findOne({ _id: id });
    if (!user) {
      client.close();
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the characters from the user
    const characters = user.characters;

    // Close the MongoDB connection
    client.close();

    return res.status(200).json(characters);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getProfileCharacters };