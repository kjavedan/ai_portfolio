import OpenAI from 'openai';

const openai = new OpenAI();

const ASSISTANT_ID: string = process.env.OPENAI_ASSISTANT_ID || '';

export { openai, ASSISTANT_ID };
