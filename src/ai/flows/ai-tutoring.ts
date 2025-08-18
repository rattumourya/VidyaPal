// This is a server-side file!
'use server';

/**
 * @fileOverview AI-powered tutoring flow for teaching uploaded content.
 *
 * - aiTutoring - A function that initiates the AI tutoring process.
 * - AiTutoringInput - The input type for the aiTutoring function.
 * - AiTutoringOutput - The return type for the aiTutoring function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTutoringInputSchema = z.object({
  content: z.string().describe('The content to be taught (book, document, or link).'),
  language: z.enum(['hindi', 'english', 'urdu']).describe('The preferred language for learning.'),
  level: z.enum(['beginner', 'intermediate', 'advanced']).describe('The learning level.'),
  question: z.string().optional().describe('Optional question from the user.'),
  learningProgress: z.string().optional().describe('The current learning progress of the user.'),
});
export type AiTutoringInput = z.infer<typeof AiTutoringInputSchema>;

const AiTutoringOutputSchema = z.object({
  teachingContent: z.string().describe('The content taught by the AI.'),
  answer: z.string().describe('The answer to the user question, if any.'),
  quiz: z.string().optional().describe('A short quiz question based on the content taught.'),
  updatedLearningProgress: z.string().describe('The updated learning progress of the user.'),
});
export type AiTutoringOutput = z.infer<typeof AiTutoringOutputSchema>;

export async function aiTutoring(input: AiTutoringInput): Promise<AiTutoringOutput> {
  return aiTutoringFlow(input);
}

const aiTutoringPrompt = ai.definePrompt({
  name: 'aiTutoringPrompt',
  input: {
    schema: AiTutoringInputSchema,
  },
  output: {
    schema: AiTutoringOutputSchema,
  },
  prompt: `You are an AI tutor specializing in teaching various subjects.

You will teach the user the content provided in their selected language and level.

Content: {{{content}}}
Language: {{{language}}}
Level: {{{level}}}

{{#if question}}
User Question: {{{question}}}
Answer the user's question in a way that is easy to understand.
{{/if}}

{{#if learningProgress}}
Current Learning Progress: {{{learningProgress}}}
Resume the learning from where the user left off.
{{/if}}

Teach the content in an interactive way. After teaching a concept, provide a short quiz question to test the user's understanding.

Make sure to store the learning progress, so that user can resume from the same concept.
`,
});

const aiTutoringFlow = ai.defineFlow(
  {
    name: 'aiTutoringFlow',
    inputSchema: AiTutoringInputSchema,
    outputSchema: AiTutoringOutputSchema,
  },
  async input => {
    const {output} = await aiTutoringPrompt(input);
    return output!;
  }
);
