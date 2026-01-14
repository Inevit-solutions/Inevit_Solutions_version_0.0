
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
    await connectDB();

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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Server error: ${(error as any).message}` });
  }
};

export default allowCors(handler);
