import { config } from 'dotenv';
config({ path: '.env' });
import express from 'express';
import connectDB from './db/connection';
import userRoutes from './routes/user.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/users', userRoutes);

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`⚡️ Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
