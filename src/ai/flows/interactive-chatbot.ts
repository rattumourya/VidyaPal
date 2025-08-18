// src/ai/flows/interactive-chatbot.ts
'use server';
/**
 * @fileOverview A interactive chatbot AI agent.
 *
 * - interactiveChatbot - A function that handles the interactive chatbot process.
 * - InteractiveChatbotInput - The input type for the interactiveChatbot function.
 * - InteractiveChatbotOutput - The return type for the interactiveChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractiveChatbotInputSchema = z.object({
  material: z.string().describe('The learning material for the chatbot to use.'),
  question: z.string().describe('The user question about the material.'),
  language: z.string().describe('The language to respond in.'),
  level: z.string().describe('The learning level of the user.'),
});
export type InteractiveChatbotInput = z.infer<typeof InteractiveChatbotInputSchema>;

const InteractiveChatbotOutputSchema = z.object({
  answer: z.string().describe('The chatbot answer to the user question.'),
});
export type InteractiveChatbotOutput = z.infer<typeof InteractiveChatbotOutputSchema>;

export async function interactiveChatbot(input: InteractiveChatbotInput): Promise<InteractiveChatbotOutput> {
  return interactiveChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interactiveChatbotPrompt',
  input: {schema: InteractiveChatbotInputSchema},
  output: {schema: InteractiveChatbotOutputSchema},
  prompt: `You are a AI chatbot specialized in explaining concepts from learning material to users.

  You will be provided with the learning material, the user question, the language to respond in, and the learning level of the user.
  You will use this information to answer the user question in a clear and easy-to-understand way, tailoring the explanation to the user's learning level.

  Learning Material: {{{material}}}
  User Question: {{{question}}}
  Language: {{{language}}}
  Learning Level: {{{level}}}

  Answer:`,
});

const interactiveChatbotFlow = ai.defineFlow(
  {
    name: 'interactiveChatbotFlow',
    inputSchema: InteractiveChatbotInputSchema,
    outputSchema: InteractiveChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
