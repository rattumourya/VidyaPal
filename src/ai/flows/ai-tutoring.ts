
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

const QuizQuestionSchema = z.object({
    question: z.string().describe("The quiz question."),
    options: z.array(z.string()).describe("A list of multiple-choice options for the question."),
    correctAnswer: z.string().describe("The correct answer from the options."),
});

const AiTutoringOutputSchema = z.object({
  teachingContent: z.string().describe('The content taught by the AI. This content should also include a notification if a quiz is ready.'),
  answer: z.string().describe('The answer to the user question, if any.'),
  quiz: z.object({
      type: z.enum(['small', 'large']).describe("The type of quiz: 'small' for quick checks, 'large' for topic summaries."),
      questions: z.array(QuizQuestionSchema).describe("An array of quiz questions."),
  }).optional().describe('A quiz to test the user\'s understanding. This should only be populated when the AI tutor deems it necessary.'),
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

You will teach the user the content provided in their selected language and level. Your primary goal is to provide clear, interactive, and effective learning content.

Content: {{{content}}}
Language: {{{language}}}
Level: {{{level}}}

{{#if question}}
User Question: {{{question}}}
Answer the user's question in a way that is easy to understand, then continue with the lesson.
{{/if}}

{{#if learningProgress}}
Current Learning Progress: {{{learningProgress}}}
Resume the learning from where the user left off.
{{/if}}

TUTORING AND QUIZ RULES:
1.  Teach the content in an interactive way.
2.  Based on your judgment of the user's progress and the material covered, you must decide when to create a quiz.
3.  A 'small' quiz should be generated after explaining one or two key concepts to quickly check for understanding.
4.  A 'large' quiz should be generated after completing a significant topic or a large section of the content.
5.  When you generate a quiz, DO NOT include the quiz questions in the 'teachingContent' output.
6.  Instead, when a quiz is ready, you MUST include a sentence in the 'teachingContent' like "Your [small/large] quiz is ready! Click the button to take it when you're prepared."
7.  You will then populate the 'quiz' object in the output with the quiz type and questions. If no quiz is needed at this step, leave the 'quiz' field empty.
8.  Ensure you keep track of and update the 'updatedLearningProgress' field so the user can resume their session later.
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

    