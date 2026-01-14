
import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables. Please set MONGODB_URI or MONGO_URI in your Vercel environment variables.");
  }

  // Validate URI format
  if (!MONGODB_URI.startsWith('mongodb://') && !MONGODB_URI.startsWith('mongodb+srv://')) {
      throw new Error("Invalid MongoDB URI format. Must start with 'mongodb://' or 'mongodb+srv://'");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // Increased from 5000 to 10000 for better reliability
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB Connected (New Connection)");
      return mongoose;
    }).catch((error) => {
      console.error("MongoDB Connection Error:", error);
      cached.promise = null;
      throw error;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    cached.promise = null;
    // Provide more descriptive error messages
    if (e.message?.includes('authentication failed')) {
      throw new Error("MongoDB authentication failed. Please check your username and password in the connection string.");
    } else if (e.message?.includes('ENOTFOUND') || e.message?.includes('getaddrinfo')) {
      throw new Error("MongoDB host not found. Please verify your MongoDB Atlas cluster URL or check your network connection.");
    } else if (e.message?.includes('IP')) {
      throw new Error("MongoDB connection blocked. Please add Vercel's IP addresses (0.0.0.0/0 for all) to your MongoDB Atlas IP whitelist.");
    }
    throw e;
  }

  return cached.conn;
};

export default connectDB;
