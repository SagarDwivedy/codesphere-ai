import groq from '../config/openai';
import { Response } from 'express';

export const streamAIResponse = async (
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
  res: Response
): Promise<string> => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const stream = await groq.chat.completions.create({
   model: 'llama-3.3-70b-versatile',
    messages,
    stream: true,
    max_tokens: 1000,
  });
  
  let fullResponse = '';

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) {
      fullResponse += content;
      res.write(`data: ${JSON.stringify({ chunk: content })}\n\n`);
    }
  }

  res.write(`data: [DONE]\n\n`);
  res.end();

  return fullResponse;
};

export const buildSystemPrompt = (category: string): string => {
  const prompts: Record<string, string> = {
    dsa: `You are CodeSphere AI, an expert DSA tutor. Help users understand 
          data structures, algorithms, time complexity, and problem-solving 
          strategies. Give clear explanations with examples.`,
    code: `You are CodeSphere AI, a senior software engineer. Help users 
           understand, debug, and improve their code. Explain concepts clearly.`,
    'system-design': `You are CodeSphere AI, a system design expert. Help users 
                      design scalable systems, explain trade-offs and patterns.`,
    general: `You are CodeSphere AI, a helpful programming assistant. 
              Answer questions clearly and concisely.`,
  };

  return prompts[category] || prompts.general;
};