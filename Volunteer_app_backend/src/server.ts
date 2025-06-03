import app from './app';
import mongoose, { initializeDatabase } from './models';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3200;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/volunteer';

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
