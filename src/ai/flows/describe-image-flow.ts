
'use server';
/**
 * @fileOverview An AI flow to generate descriptions for images or card messages based on hints.
 *
 * - describeImage - A function that generates a description for an image or a card message.
 * - DescribeImageInput - The input type for the describeImage function.
 * - DescribeImageOutput - The return type for the describeImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DescribeImageInputSchema = z.object({
  hint: z.string().describe('A short hint or keywords for image content, or a detailed prompt for a card message.'),
});
export type DescribeImageInput = z.infer<typeof DescribeImageInputSchema>;

const DescribeImageOutputSchema = z.object({
  description: z.string().describe('A generated description or message.'),
});
export type DescribeImageOutput = z.infer<typeof DescribeImageOutputSchema>;

export async function describeImage(input: DescribeImageInput): Promise<DescribeImageOutput> {
  return describeImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'describeImagePrompt',
  input: {schema: DescribeImageInputSchema},
  output: {schema: DescribeImageOutputSchema},
  prompt: `Por favor, genera el texto en ESPAÑOL.
Si el siguiente 'hint' sugiere una descripción de imagen: crea una leyenda corta (1-2 frases), conmovedora y descriptiva para una imagen, adecuada para un collage del Día de la Madre. La imagen trata sobre: {{{hint}}}. Concéntrate en las emociones, las relaciones y los sentimientos positivos.
Si el 'hint' es una solicitud más detallada para un mensaje de tarjeta (por ejemplo, un texto más largo y emotivo): sigue esas instrucciones detalladas para generar el mensaje de la tarjeta como se solicita, asegurándote de que el resultado sea en español y profundamente emotivo.

Hint proporcionado: {{{hint}}}`,
  config: {
    temperature: 0.75, // Slightly increased for more creative and emotional text
     safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE', 
      },
    ],
  }
});

const describeImageFlow = ai.defineFlow(
  {
    name: 'describeImageFlow',
    inputSchema: DescribeImageInputSchema,
    outputSchema: DescribeImageOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      // Fallback description if AI generation fails or returns nothing
      // This fallback will be in Spanish due to previous messages.
      return { description: `Un momento hermoso: ${input.hint}` };
    }
    return output;
  }
);

