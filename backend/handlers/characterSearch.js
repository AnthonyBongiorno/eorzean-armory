const XIVAPI = require('@xivapi/js');
const { MongoClient } = require('mongodb');
const xiv = new XIVAPI();
require('dotenv').config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// MongoDB URI
const uri = process.env.MONGO_URI;
const dbName = 'EorzeanArmory';

const verifyCharacter = async (req, res) => {
    try {
      // Extract the character name and server from the request query parameters
      const { name, serverName } = req.query;

      // Find the character with the provided name and server
      const resData = await xiv.character.search(name, serverName );
  
      // Check if any characters were found
      if (resData.Results.length === 0) {
        return res.status(404).json({ error: 'Character not found' });
      }
  
      // Get the first character from the search results
      const char = resData.Results[0];
  
      // Access the character's properties
      const characterName = char.Name;
      const server = char.serverName;
      const lodestoneId = char.ID;
  
      // Fetch the character details, including the avatar
      const characterDetails = await xiv.character.get(lodestoneId, { data: 'AC' });
      const avatar = characterDetails.Character.Avatar;
  
      // Connect to MongoDB
      const client = new MongoClient(uri, options);
      await client.connect();
      const db = client.db(dbName);
  
      // Check if the character ID is claimed
      const isClaimed = await db.collection('claimedID').findOne({ characterId: String(lodestoneId) });
  
      // Close the MongoDB connection
      client.close();
  
      // Construct the response object
      const response = {
        name: characterName,
        server: server,
        lodestoneId: lodestoneId,
        avatar: avatar,
        isClaimed: !!isClaimed,
      };
  
      // Return the response as JSON
      return res.json(response);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };

module.exports = { verifyCharacter };