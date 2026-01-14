
import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from './_lib/db';
import { Subscriber } from './_lib/models';

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

  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Connect to database first and ensure it's ready
    const mongoose = await connectDB();
    
    // Ensure connection is ready before using models
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection is not ready');
    }
    
    // Check if exists
    const existing = await Subscriber.findOne({ email });
    if (existing) {
       return res.status(200).json({ message: 'Already subscribed' });
    }

    const newSub = new Subscriber({ email });
    await newSub.save();
    return res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error: any) {
    console.error('Subscribe API Error:', {
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
      errorMessage = 'This email is already subscribed';
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
