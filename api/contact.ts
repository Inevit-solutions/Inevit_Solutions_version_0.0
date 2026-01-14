import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getClientsCollection } from './lib/models';

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
    const { name, email, organization, interest, message } = request.body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return response.status(400).json({ 
        error: 'Bad request',
        message: 'Name is required' 
      });
    }

    if (!email || typeof email !== 'string') {
      return response.status(400).json({ 
        error: 'Bad request',
        message: 'Email is required' 
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

    if (!interest || typeof interest !== 'string' || interest.trim().length === 0) {
      return response.status(400).json({ 
        error: 'Bad request',
        message: 'Interest is required' 
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return response.status(400).json({ 
        error: 'Bad request',
        message: 'Message is required' 
      });
    }

    // Insert client submission
    const clientsCollection = await getClientsCollection();
    const result = await clientsCollection.insertOne({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      organization: organization ? organization.trim() : undefined,
      interest: interest.trim(),
      message: message.trim(),
      submittedAt: new Date(),
    });

    return response.status(201).json({ 
      success: true,
      message: 'Contact form submitted successfully',
      id: result.insertedId.toString()
    });

  } catch (error) {
    console.error('Error in contact API:', error);
    return response.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to submit contact form. Please try again later.' 
    });
  }
}
