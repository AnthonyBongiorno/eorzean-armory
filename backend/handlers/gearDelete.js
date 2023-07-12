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

async function deleteGearHandler(req, res) {
    try {
        const { gearId, userId } = req.body;
    
        const client = new MongoClient(uri, options);
        await client.connect();
    
        const db = client.db(dbName);
    
        // Find the user by ID and remove the gear from the gear array
        const result = await db.collection('users').updateOne(
          { _id: userId },
          { $pull: { gear: { id: gearId } } }
        );
    
        client.close();
    
        if (result.modifiedCount === 0) {
          return res.status(400).json({ error: 'Failed to delete gear' });
        }
    
        return res.status(200).json({ message: 'Gear deleted successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
      }
    }
  
  module.exports = { deleteGearHandler };