'use client';

import { cn } from '@/lib/utils';
import Chat from '@/components/chat';
import { useChat } from '@/hooks/use-chat';
import Messages from '@/components/messages';
import Suggestion from '@/components/suggestion';

export default function About() {
  const { input, setInput, messages, status, sendMessage, appendNewMessage } =
    useChat();

  const handleSubmit = async () => {
    if (!input.trim()) return;
    appendNewMessage('user', input);
    await sendMessage(input);
  };

  const handleSelect = async (text: string) => {
    appendNewMessage('user', text);
    await sendMessage(text);
  };

  return (
    <div
      className={cn(
        'relative h-full gap-0 overflow-hidden',
        !messages.length &&
          'mb-20 flex flex-col items-center justify-center gap-6 overflow-y-scroll',
      )}
    >
      <Messages messages={messages} status={status} />
      <Chat
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        status={status}
        hasMessages={messages.length > 0}
      />
      {!messages.length && <Suggestion onSelect={handleSelect} />}
    </div>
  );
}
