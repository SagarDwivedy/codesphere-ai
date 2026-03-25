import { Request, Response } from 'express';
import { getProblems, getProblemBySlug } from '../services/dsa.service';
import { streamAIResponse } from '../services/ai.service';

export const listProblems = async (req: Request, res: Response) => {
  try {
    const { difficulty, category, search } = req.query;
    const problems = await getProblems({
      difficulty: difficulty as any,
      category: category as any,
      search: search as string,
    });
    return res.status(200).json({ problems, count: problems.length });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProblem = async (req: Request, res: Response) => {
  try {
    const problem = await getProblemBySlug(req.params.slug as string);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    return res.status(200).json({ problem });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const explainProblem = async (req: Request, res: Response) => {
  try {
    const problem = await getProblemBySlug(req.params.slug as string);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });

    const messages = [
      {
        role: 'system' as const,
        content: `You are CodeSphere AI, an expert DSA tutor. Explain problems clearly with intuition, approach, and complexity analysis.`,
      },
      {
        role: 'user' as const,
        content: `Explain this problem step by step:
Title: ${problem.title}
Description: ${problem.description}
Solution: ${problem.solution}
Time: ${problem.timeComplexity}, Space: ${problem.spaceComplexity}

Give: 1) Intuition 2) Approach 3) Why this complexity`,
      },
    ];

    await streamAIResponse(messages, res);
  } catch (error: any) {
    if (!res.headersSent)
      return res.status(500).json({ message: error.message });
  }
};