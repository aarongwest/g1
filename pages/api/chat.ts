import type { NextApiRequest, NextApiResponse } from 'next';
import { Anthropic } from '@anthropic-ai/sdk';

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const completion = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 300,
        messages: [{ role: 'user', content: message }]
      });

      const messageContent = completion.content[0].type === 'text' 
        ? completion.content[0].text 
        : 'Unable to process response';
      res.status(200).json({ message: messageContent });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error processing your request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
