
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
    await connectDB();
    
    // Check if exists
    const existing = await Subscriber.findOne({ email });
    if (existing) {
       return res.status(200).json({ message: 'Already subscribed' });
    }

    const newSub = new Subscriber({ email });
    await newSub.save();
    return res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Server error: ${(error as any).message}` });
  }
};

export default allowCors(handler);
