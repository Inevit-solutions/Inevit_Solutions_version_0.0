
import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: String },
  interest: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

export const Connection = mongoose.model('Connection', connectionSchema, 'Connections');
