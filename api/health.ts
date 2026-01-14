
import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return res.status(500).json({ status: 'error', message: 'MONGODB_URI is missing' });
    }

    // Masked URI
    const maskedUri = uri.replace(/:([^@]+)@/, ':****@');

    const state = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];

    // Try explicit connection if not connected (1 = connected state)
    let connectionResult = 'Skipped';
    if (state !== 1) {
        try {
            await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
            connectionResult = 'Success';
        } catch (connErr: any) {
            connectionResult = `Failed: ${connErr.message}`;
        }
    }

    return res.status(200).json({
      status: 'ok',
      mongo_state: states[state] || 'unknown',
      uri_configured: 'yes',
      uri_masked: maskedUri,
      connection_attempt: connectionResult,
      env_check: {
        node_env: process.env.NODE_ENV,
        vercel: process.env.VERCEL
      }
    });

  } catch (error: any) {
    return res.status(500).json({ 
      status: 'fatal_error', 
      message: error.message, 
      stack: error.stack 
    });
  }
}
