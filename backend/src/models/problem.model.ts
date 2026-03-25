import mongoose, { Document, Schema } from 'mongoose';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type DSACategory =
  | 'array'
  | 'string'
  | 'linked-list'
  | 'tree'
  | 'graph'
  | 'dynamic-programming'
  | 'sorting'
  | 'searching'
  | 'stack-queue'
  | 'recursion';

export interface IProblem extends Document {
  title: string;
  slug: string;
  difficulty: Difficulty;
  category: DSACategory;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  solution: string;
  timeComplexity: string;
  spaceComplexity: string;
  tags: string[];
}

const problemSchema = new Schema<IProblem>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    category: { type: String, required: true },
    description: { type: String, required: true },
    examples: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],
    constraints: [String],
    solution: { type: String, required: true },
    timeComplexity: { type: String, required: true },
    spaceComplexity: { type: String, required: true },
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model<IProblem>('Problem', problemSchema);