const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// MongoDB URI
const uri = process.env.MONGO_URI;
const dbName = 'EorzeanArmory';

async function signupHandler(req, res) {
    try {
        const { email, password, username } = req.body;

        // Generate a salt for password hashing
        const salt = await bcrypt.genSalt(10);

        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const client = new MongoClient(uri, options);

        await client.connect();

        const db = client.db(dbName);

        // Check if the user already exists
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            client.close();
            return res.status(400).json({ error: 'User already exists' });
        }

        // Generate a unique ID using uuid
        const id = uuidv4();

        // Create a new user document with hashed password and generated ID
        const user = { _id: id, email, password: hashedPassword, username, characters: [], gear: [] };

        // Insert the user document into the collection
        await db.collection('users').insertOne(user);

        // Close the MongoDB connection
        client.close();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { signupHandler };