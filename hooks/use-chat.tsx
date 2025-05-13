import { toast } from 'sonner';
import { useEffect, useRef, useState } from 'react';
import { AssistantStream } from 'openai/lib/AssistantStream.mjs';

import type { ChatStatus, MessageType } from '@/types';

export const useChat = () => {
  const abortRef = useRef<boolean>(false);
  const threadIdRef = useRef<string>('');
  const [input, setInput] = useState<string>('');

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [status, setStatus] = useState<ChatStatus>('ready');

  const createThread = async () => {
    const res = await fetch('/api/threads', {
      method: 'POST',
    });
    const data = await res.json();
    threadIdRef.current = data.threadId;
  };

  useEffect(() => {
    createThread();
  }, []);

  const sendMessage = async (text: string) => {
    abortRef.current = false;
    appendNewMessage('user', text);
    appendNewMessage('assistant');

    setStatus('loading');

    if (!threadIdRef.current) {
      await handleUndefinedThreadId();
    }

    await fetch(`/api/threads/${threadIdRef.current}`, {
      method: 'POST',
      body: JSON.stringify({
        content: text,
      }),
      signal: AbortSignal.timeout(15_000),
    })
      .then((res) => {
        if (!res.body) throw new Error('No response body');

        const stream = AssistantStream.fromReadableStream(res.body);

        stream
          .on('textDelta', async ({ value }) => {
            if (abortRef.current) {
              stream.abort();
              return;
            }
            handleTextDelta(value);
          })
          .on('abort', () => setStatus('ready'))
          .on('textDone', () => setStatus('ready'))
          .on('error', (error) => {
            console.error(error);
            setStatus('error');
          });
      })
      .catch((error) => {
        console.error(error);
        setStatus(error === 'aborted' ? 'ready' : 'error');
      });
  };

  const handleTextDelta = (text: string | undefined) => {
    if (status !== 'busy') {
      setStatus('busy');
    }
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

  const handleAbort = () => {
    console.log('aborted');
    abortRef.current = true;
    setStatus('abort');
  };

  const handleRetry = () => {
    if (!messages.length) window.location.reload();
    const pendingMesage = messages[messages.length - 2].text;
    setMessages((prevMessages) => [
      ...prevMessages.slice(0, prevMessages.length - 2),
    ]);
    sendMessage(pendingMesage);
  };

  const handleUndefinedThreadId = async () => {
    try {
      let timeoutId: ReturnType<typeof setTimeout>;

      // Wait till threadId gets initialized before calling messages api
      await Promise.race([
        new Promise<void>((resolve) => {
          const checkThreadId = () => {
            if (threadIdRef.current) {
              clearTimeout(timeoutId);
              resolve();
            } else {
              timeoutId = setTimeout(checkThreadId, 500);
            }
          };
          checkThreadId();

          return () => clearTimeout(timeoutId);
        }),

        // Reject after 5 seconds if threadId didn't get initialized
        new Promise((_, reject) => {
          setTimeout(() => {
            clearTimeout(timeoutId);
            reject(new Error('Thread creation timeout'));
          }, 5000);
        }),
      ]);
    } catch (error) {
      console.error(error);
      setStatus('error');
      toast.error('Failed to create thread');
      return;
    }
  };

  return {
    input,
    status,
    messages,
    //
    setInput,
    sendMessage,
    handleRetry,
    handleAbort,
    appendNewMessage,
  };
};
