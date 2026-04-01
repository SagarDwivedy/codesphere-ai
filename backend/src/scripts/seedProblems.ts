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

  // Validate all problems before inserting
  let validCount = 0;
  let errorCount = 0;

  for (let i = 0; i < problems.length; i++) {
    const p = problems[i];
    if (!p.title || !p.slug || !p.difficulty || !p.category || !p.description || !p.solution || !p.timeComplexity || !p.spaceComplexity) {
      console.error(`Problem at index ${i} is missing required fields:`, {
        title: !!p.title,
        slug: !!p.slug,
        difficulty: !!p.difficulty,
        category: !!p.category,
        description: !!p.description,
        solution: !!p.solution,
        timeComplexity: !!p.timeComplexity,
        spaceComplexity: !!p.spaceComplexity,
      });
      errorCount++;
      continue;
    }
    try {
      await Problem.create(p);
      validCount++;
    } catch (err: any) {
      console.error(`Failed to insert problem at index ${i} (${p.title}):`, err.message);
      errorCount++;
    }
  }

  console.log(`Seeded ${validCount} problems successfully`);
  if (errorCount > 0) console.log(`${errorCount} problems failed`);

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});