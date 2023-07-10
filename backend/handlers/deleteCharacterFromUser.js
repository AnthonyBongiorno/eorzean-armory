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


async function deleteCharacterHandler(req, res) {
    try {
        const { characterName, userId } = req.body;
    
        const client = new MongoClient(uri, options);
        await client.connect();
    
        const db = client.db(dbName);
    
        // Find the user by ID and remove the character from the characters array
        const result = await db.collection('users').updateOne(
          { _id: userId },
          { $pull: { characters: { characterName } } }
        );
    
        // Remove the character name and server combination from the claimedID collection
        await db.collection('claimedID').deleteOne({ characterName });
    
        client.close();
    
        if (result.modifiedCount === 0) {
          return res.status(400).json({ error: 'Failed to detach character' });
        }
    
        return res.status(200).json({ message: 'Character detached successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
      }
    }
  
  module.exports = { deleteCharacterHandler };