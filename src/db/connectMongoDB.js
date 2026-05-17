import mongoose from 'mongoose';
import Note from '../models/note.js';
import 'dotenv/config';

export const connectMongoDB = async () => {
  try {
    const connectionString = process.env.MONGO_URL;

    if (!connectionString) {
      console.error(
        'Error: MONGO_URL is not defined in environment variables.',
      );
      process.exit(1);
    }

    await mongoose.connect(connectionString);
    console.log('Database connection successful');
    Note.syncIndexes();
    console.log('Index sync successfully');
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};
