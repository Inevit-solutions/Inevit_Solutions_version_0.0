
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
});

export const Subscriber = (mongoose.models.Subscriber as mongoose.Model<any>) || mongoose.model('Subscriber', subscriberSchema, 'Subscribers');

// Connection Model
const connectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: String },
  interest: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

export const Connection = (mongoose.models.Connection as mongoose.Model<any>) || mongoose.model('Connection', connectionSchema, 'Connections');
