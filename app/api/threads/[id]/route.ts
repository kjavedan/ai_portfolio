import { NextRequest } from 'next/server';
import { ASSISTANT_ID, openai } from '@/lib/config';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { content } = await req.json();

  await openai.beta.threads.messages.create(id, {
    role: 'user',
    content,
  });
  const stream = openai.beta.threads.runs.stream(id, {
    assistant_id: ASSISTANT_ID,
  });
  return new Response(stream.toReadableStream());
}
