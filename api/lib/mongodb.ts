import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not set');
}

const uri: string = process.env.MONGODB_URI || '';
const options = {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
};

// Use a global variable to cache the MongoClient connection across serverless function invocations
// This is important for Vercel serverless functions to reuse connections
let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().catch((error) => {
      // Reset the promise on error so we can retry
      globalWithMongo._mongoClientPromise = undefined;
      console.error('MongoDB connection error:', error);
      throw error;
    });
  }

  return globalWithMongo._mongoClientPromise;
}

// Helper function to get database with error handling
export async function getDatabase(): Promise<Db> {
  try {
    const client = await getClientPromise();
    return client.db();
  } catch (error) {
    console.error('Failed to get MongoDB database:', error);
    throw new Error('Database connection failed. Please check MONGODB_URI environment variable.');
  }
}
