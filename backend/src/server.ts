import { config } from 'dotenv';
config({ path: '.env' });
import express from 'express';
import connectDB from './db/connection';
const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
