import { cn } from '@/lib/utils';

import Message from './message';
import { Greeting } from './greeting';

import type { MessageType } from '@/types';

export default function Messages({
  messages,
  status,
}: {
  messages: MessageType[];
  status: 'ready' | 'loading' | 'busy' | 'error';
}) {
  return (
    <div
      className={cn(
        'flex max-h-[calc(100dvh-290px)] min-w-0 flex-1 flex-col gap-6 overflow-y-scroll pr-4',
        messages.length && 'pb-36',
      )}
    >
      {messages.length === 0 && <Greeting />}

      {messages.map((msg, index) => (
        <Message
          key={index}
          message={msg}
          isError={status === 'error' && index === messages.length - 1}
          isLoading={status === 'loading' && index === messages.length - 1}
        />
      ))}
    </div>
  );
}
