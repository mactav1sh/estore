import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const db = process.env.DATABASE_LOCAL_URL as string;

mongoose.connect(db).then(() => {
  console.log('database connected');
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log('started');
});
