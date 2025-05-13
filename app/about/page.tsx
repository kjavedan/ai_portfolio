'use client';

import { cn } from '@/lib/utils';
import Chat from '@/components/chat';
import { useChat } from '@/hooks/use-chat';
import Messages from '@/components/messages';
import Suggestion from '@/components/suggestion';
import { useMenu } from '@/context/menu-context';

export default function About() {
  const {
    input,
    messages,
    status,
    setInput,
    sendMessage,
    handleRetry,
    handleAbort,
  } = useChat();

  const { closeMenu } = useMenu();

  const handleSubmit = async (text: string | undefined) => {
    if (!text && !input.trim()) return;
    closeMenu();
    await sendMessage(text ? text : input);
  };

  return (
    <div
      className={cn(
        'relative h-full gap-0 overflow-hidden pb-4',
        !messages.length &&
          'flex flex-col items-center justify-center gap-6 overflow-y-scroll md:mb-20',
      )}
    >
      <Messages messages={messages} status={status} handleRetry={handleRetry} />
      <Chat
        input={input}
        status={status}
        setInput={setInput}
        onSubmit={handleSubmit}
        handleAbort={handleAbort}
        hasMessages={messages.length > 0}
      />
      {!messages.length && <Suggestion onSelect={handleSubmit} />}
    </div>
  );
}
