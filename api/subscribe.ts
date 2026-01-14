import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSubscribersCollection } from './lib/models';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are allowed' 
    });
  }

  try {
    const { email } = request.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return response.status(400).json({ 
        error: 'Bad request',
        message: 'Email is required and must be a string' 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).json({ 
        error: 'Bad request',
        message: 'Invalid email format' 
      });
    }

    // Normalize email (lowercase)
    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists
    const subscribersCollection = await getSubscribersCollection();
    const existingSubscriber = await subscribersCollection.findOne({ 
      email: normalizedEmail 
    });

    if (existingSubscriber) {
      return response.status(200).json({ 
        success: true,
        message: 'Email already subscribed',
        alreadySubscribed: true
      });
    }

    // Insert new subscriber
    const result = await subscribersCollection.insertOne({
      email: normalizedEmail,
      subscribedAt: new Date(),
    });

    return response.status(201).json({ 
      success: true,
      message: 'Successfully subscribed',
      id: result.insertedId.toString()
    });

  } catch (error) {
    console.error('Error in subscribe API:', error);
    return response.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process subscription. Please try again later.' 
    });
  }
}
