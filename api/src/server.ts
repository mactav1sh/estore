import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const db =
  process.env.NODE_ENV === 'production'
    ? (process.env.DATABASE_URL as string)
    : (process.env.DATABASE_LOCAL_URL as string);

mongoose.connect(db).then(() => {
  console.log('database connected');
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log('started');
});
