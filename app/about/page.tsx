'use client';

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
    <div className="relative size-full">
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
