import { openai } from '@/lib/config';

export async function POST() {
  const thread = await openai.beta.threads.create();
  return Response.json({ threadId: thread.id });
}
