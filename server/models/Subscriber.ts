
import mongoose from 'mongoose';

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
