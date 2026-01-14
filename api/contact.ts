
import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from './_lib/db';
import { Subscriber, Connection } from './_lib/models';

// Configure CORS
const allowCors = (fn: any) => async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
     return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, organization, interest, message } = req.body;

  if (!name || !email || !interest || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Connect to database first and ensure it's ready
    const mongoose = await connectDB();
    
    // Ensure connection is ready before using models
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection is not ready');
    }

    // 1. Save Connection
    const newConnection = new Connection({
      name,
      email,
      organization,
      interest,
      message
    });
    await newConnection.save();

    // 2. Ensure Email is in Subscribers
    const existingSub = await Subscriber.findOne({ email });
    if (!existingSub) {
      const newSub = new Subscriber({ email });
      await newSub.save();
    }

    return res.status(201).json({ message: 'Transmission received' });
  } catch (error: any) {
    console.error('Contact API Error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
      error: error
    });
    
    // Provide more specific error messages
    let errorMessage = 'A server error has occurred';
    
    if (error.message?.includes('MONGODB_URI') || error.message?.includes('MONGO_URI')) {
      errorMessage = 'Database configuration error: MongoDB connection string is missing or invalid';
    } else if (error.message?.includes('timeout') || error.message?.includes('ECONNREFUSED')) {
      errorMessage = 'Database connection failed: Unable to reach MongoDB server. Please check network settings and IP whitelist.';
    } else if (error.message?.includes('duplicate key') || error.code === 11000) {
      errorMessage = 'This email has already been registered';
    } else if (error.message?.includes('not ready')) {
      errorMessage = 'Database connection is not ready. Please try again.';
    } else if (error.message?.includes('Model') || error.message?.includes('model')) {
      errorMessage = 'Database model error. Please check server logs.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return res.status(500).json({ 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default allowCors(handler);
