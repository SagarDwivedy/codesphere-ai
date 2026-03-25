import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import mongoose from 'mongoose';
import Problem from '../models/problem.model';
import { problems } from '../data/problems';

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('Connected to MongoDB');

  await Problem.deleteMany({});
  console.log('Cleared existing problems');

  await Problem.insertMany(problems);
  console.log(`Seeded ${problems.length} problems`);

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});