import { getDatabase } from './mongodb';
import { Db, Collection } from 'mongodb';

export interface Subscriber {
  _id?: string;
  email: string;
  subscribedAt: Date;
}

export interface Client {
  _id?: string;
  name: string;
  email: string;
  organization?: string;
  interest: string;
  message: string;
  submittedAt: Date;
}

// Get collections
export async function getSubscribersCollection(): Promise<Collection<Subscriber>> {
  const db = await getDatabase();
  return db.collection<Subscriber>('Subscribers');
}

export async function getClientsCollection(): Promise<Collection<Client>> {
  const db = await getDatabase();
  return db.collection<Client>('Clients');
}
