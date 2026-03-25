import Problem, { Difficulty, DSACategory } from '../models/problem.model';

export const getProblems = async (filters: {
  difficulty?: Difficulty;
  category?: DSACategory;
  search?: string;
}) => {
  const query: any = {};

  if (filters.difficulty) query.difficulty = filters.difficulty;
  if (filters.category) query.category = filters.category;
  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { tags: { $in: [new RegExp(filters.search, 'i')] } },
    ];
  }

  return Problem.find(query).select('-solution').sort({ difficulty: 1 });
};

export const getProblemBySlug = async (slug: string) => {
  return Problem.findOne({ slug });
};