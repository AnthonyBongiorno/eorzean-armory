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

async function attachCharacterHandler(req, res) {
    
    try {
      const { characterId, userId } = req.body;
  
      const client = new MongoClient(uri, options);
      await client.connect();
  
      const db = client.db(dbName);
  
      // Check if the character ID is already claimed
      const isClaimed = await db.collection('claimedID').findOne({ characterId });
      if (isClaimed) {
        client.close();
        return res.status(400).json({ error: 'Character ID is already claimed' });
      }
  
      // Find the user by ID and update the characters array with the new character ID
      const result = await db.collection('users').updateOne(
        { _id: userId },
        { $addToSet: { characters: characterId } }
      );
  
      // Add the character ID to the claimedID collection
      await db.collection('claimedID').insertOne({ characterId });
  
      client.close();
  
      if (result.modifiedCount === 0) {
        return res.status(400).json({ error: 'Failed to attach character' });
      }
  
      return res.status(200).json({ message: 'Character attached successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
  
  module.exports = { attachCharacterHandler };