import { useCallback, useRef, useState } from 'react';

import type { ChatStatus, MessageType } from '@/types';

export const useChat = () => {
  const abortControllerRef = useRef<AbortController | null>(null);
  const pendingTextRef = useRef<string>('');
  const rafIdRef = useRef<number>(0);

  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [status, setStatus] = useState<ChatStatus>('ready');

  // Flush accumulated text to React state on the next animation frame
  const scheduleFlush = useCallback(() => {
    if (rafIdRef.current) return; // already scheduled

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = 0;
      const text = pendingTextRef.current;
      if (!text) return;

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        return [...prev.slice(0, -1), { ...last, text: last.text + text }];
      });
      pendingTextRef.current = '';
    });
  }, []);

  const sendMessage = async (text: string) => {
    const userMessage: MessageType = { role: 'user', text };
    const assistantMessage: MessageType = { role: 'assistant', text: '' };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput('');
    setStatus('loading');
    pendingTextRef.current = '';

    // Build the messages array for the API (include full history)
    const apiMessages = [
      ...messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.text,
      })),
      { role: 'user' as const, content: text },
    ];

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!res.body) throw new Error('No response body');

      setStatus('busy');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        if (controller.signal.aborted) {
          reader.cancel();
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        pendingTextRef.current += chunk;
        scheduleFlush();
      }

      // Final flush for any remaining text
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
      if (pendingTextRef.current) {
        const remaining = pendingTextRef.current;
        pendingTextRef.current = '';
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            { ...last, text: last.text + remaining },
          ];
        });
      }

      if (!controller.signal.aborted) {
        setStatus('ready');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setStatus('ready');
      } else {
        console.error(error);
        setStatus('error');
      }
    } finally {
      abortControllerRef.current = null;
    }
  };

  const handleAbort = () => {
    abortControllerRef.current?.abort();
    setStatus('abort');

    // Brief delay then ready so the UI can settle
    setTimeout(() => setStatus('ready'), 300);
  };

  const handleRetry = () => {
    if (!messages.length) {
      window.location.reload();
      return;
    }
    const pendingMessage = messages[messages.length - 2].text;
    setMessages((prev) => prev.slice(0, -2));
    sendMessage(pendingMessage);
  };

  const appendNewMessage = (
    role: 'user' | 'assistant',
    text: string = '',
  ): void => {
    setMessages((prev) => [...prev, { role, text }]);
    setInput('');
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
