
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { Subscriber } from './models/Subscriber';
import { Connection } from './models/Connection';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: '*', // Temporarily allow all to rule out CORS issues
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Connect DB
// Note: In a real app, you should not hardcode the password.
// The user provided the connection string with a placeholder. I will assume they update the .env or I should ask, but for now I will put a placeholder in .env
connectDB();

// Routes

// 1. Subscribe (Footer)
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Check if exists
    const existing = await Subscriber.findOne({ email });
    if (existing) {
       return res.status(200).json({ message: 'Already subscribed' });
    }

    const newSub = new Subscriber({ email });
    await newSub.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 2. Contact Form (Connections)
app.post('/api/contact', async (req, res) => {
  const { name, email, organization, interest, message } = req.body;

  if (!name || !email || !interest || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // 1. Save Connection
    const newConnection = new Connection({
      name,
      email,
      organization,
      interest,
      message
    });
    await newConnection.save();

    // 2. Ensure Email is in Subscribers (Upsert logic or Check-then-Insert)
    const existingSub = await Subscriber.findOne({ email });
    if (!existingSub) {
      const newSub = new Subscriber({ email });
      await newSub.save();
    }

    res.status(201).json({ message: 'Transmission received' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
