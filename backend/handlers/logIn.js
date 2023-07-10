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

async function loginHandler(req, res) {
    try {
      const { email, password } = req.body;
  
      const client = new MongoClient(uri, options);
  
      await client.connect();
  
      const db = client.db(dbName);
  
      // Find the user with the given email
      const user = await db.collection('users').findOne({ email });
      if (!user) {
        client.close();
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        client.close();
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Create a new object with the desired user data
      const userData = {
        username: user.username,
        characters: user.characters,
      };
  
      // Close the MongoDB connection
      client.close();
  
      // Save the user data to local storage
      //localStorage.setItem('user', JSON.stringify(userData));
  
      return res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
  
  module.exports = { loginHandler };