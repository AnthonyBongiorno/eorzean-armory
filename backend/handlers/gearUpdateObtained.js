
const { MongoClient } = require('mongodb');
require('dotenv').config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const uri = process.env.MONGO_URI;
const dbName = 'EorzeanArmory';

async function updateGearHandler(req, res) {
  try {
    const { gearId, userId, isObtained } = req.body;

    const client = new MongoClient(uri, options);
    await client.connect();

    const db = client.db(dbName);

    const result = await db.collection('users').updateOne(
      { _id: userId, "gear.id": gearId },
      { $set: { "gear.$.isObtained": isObtained } }
    );

    client.close();

    console.log(result);
    if (result.modifiedCount === 0) {
      return res.status(502).json({ error: 'Failed to update gear' });
    }

    return res.status(200).json({ message: 'Gear updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { updateGearHandler };