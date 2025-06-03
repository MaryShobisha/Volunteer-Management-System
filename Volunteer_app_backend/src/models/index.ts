import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME!;
const dbUser = process.env.DB_USER!;
const dbPassword = process.env.DB_PASSWORD!;
const dbHost = process.env.DB_HOST!;

async function initializeDatabase() {
  const mongoUri = `mongodb://localhost:27017/volunteer?authSource=admin`;

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export { initializeDatabase };
export default mongoose;

export * from './User';
