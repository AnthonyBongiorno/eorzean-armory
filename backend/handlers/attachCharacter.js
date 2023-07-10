const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
require('dotenv').config();
const XIVAPI = require('@xivapi/js');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// MongoDB URI
const uri = process.env.MONGO_URI;
const dbName = 'EorzeanArmory';

async function attachCharacterHandler(req, res) {
  try {
    const { characterName, serverName, userId } = req.body;

    const client = new MongoClient(uri, options);
    await client.connect();

    const db = client.db(dbName);

    // Check if the character name and server combination is already claimed
    const isClaimed = await db.collection('claimedID').findOne({ characterName, serverName });
    if (isClaimed) {
      client.close();
      return res.status(400).json({ error: 'Character is already claimed' });
    }

    // Retrieve the character details from XIVAPI
    const xiv = new XIVAPI();
    const characterSearchResults = await xiv.character.search(characterName, serverName);
    if (characterSearchResults.Results.length === 0) {
      client.close();
      return res.status(404).json({ error: 'Character not found' });
    }
    const character = characterSearchResults.Results[0];
    const characterId = character.ID;
    const avatar = character.Avatar;

    // Find the user by ID and update the characters array with the new character details
    const result = await db.collection('users').updateOne(
      { _id: userId },
      { $addToSet: { characters: { characterId, characterName, serverName, avatar } } }
    );

    // Add the character name and server combination to the claimedID collection
    await db.collection('claimedID').insertOne({ characterName, serverName });

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