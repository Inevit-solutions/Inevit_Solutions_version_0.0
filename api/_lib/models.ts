
import mongoose from 'mongoose';

// Subscriber Model
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'Subscribers'
});

// Connection Model
const connectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: String },
  interest: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
}, {
  collection: 'Connections'
});

// Helper function to get or create model (serverless-safe)
function getModel<T>(modelName: string, schema: mongoose.Schema, collectionName: string): mongoose.Model<T> {
  try {
    // Check if model already exists
    if (mongoose.models[modelName]) {
      return mongoose.models[modelName] as mongoose.Model<T>;
    }
    // Create new model
    return mongoose.model<T>(modelName, schema, collectionName);
  } catch (error) {
    // If there's an error, try to delete and recreate
    if (mongoose.models[modelName]) {
      delete mongoose.models[modelName];
    }
    return mongoose.model<T>(modelName, schema, collectionName);
  }
}

// Initialize models (will be registered when mongoose connects)
export const Subscriber = getModel<any>('Subscriber', subscriberSchema, 'Subscribers');
export const Connection = getModel<any>('Connection', connectionSchema, 'Connections');
