import { useEffect, useState } from 'react';
import { AssistantStream } from 'openai/lib/AssistantStream.mjs';

import type { MessageType } from '@/types';

type ChatStatus = 'ready' | 'loading' | 'busy' | 'error';

export const useChat = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [threadId, setThreadId] = useState('');
  const [status, setStatus] = useState<ChatStatus>('error');

  useEffect(() => {
    const createThread = async () => {
      const res = await fetch('/api/threads', {
        method: 'POST',
      });
      const data = await res.json();
      setThreadId(data.threadId);
    };
    createThread();
  }, []);

  const sendMessage = async (text: string) => {
    setStatus('loading');
    appendNewMessage('assistant');

    const res = await fetch(`/api/threads/${threadId}`, {
      method: 'POST',
      body: JSON.stringify({
        content: text,
      }),
    });

    if (!res.body) throw new Error('No response body');
    const stream = AssistantStream.fromReadableStream(res.body);

    stream
      .on('textDelta', async ({ value }) => handleTextDelta(value))
      .on('error', (error) => {
        console.log(error);
        setStatus('error');
      })
      .on('end', () => setStatus('ready'));
  };

  const handleTextDelta = (text: string | undefined) => {
    setStatus('busy');
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
        text: lastMessage.text + text,
      };
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };

  const appendNewMessage = (
    role: 'user' | 'assistant',
    text: string = '',
  ): void => {
    setMessages((prevMessages) => [...prevMessages, { role, text }]);
    setInput('');
  };

  return {
    input,
    status,
    messages,
    //
    setInput,
    sendMessage,
    appendNewMessage,
  };
};
