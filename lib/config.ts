import OpenAI from 'openai';

const openai = new OpenAI();

const ASSISTANT_ID: string = process.env.OPENAI_ASSISTANT_ID || '';

// System prompt for Chat Completions API — copy your assistant's instructions here
const SYSTEM_PROMPT: string =
  process.env.SYSTEM_PROMPT ||
  `You are Khaled's AI portfolio assistant. You help visitors learn about Khaled's skills, experience, and projects. Be concise, friendly, and professional. Answer questions about Khaled's work, technical abilities, and background.`;

export { openai, ASSISTANT_ID, SYSTEM_PROMPT };
