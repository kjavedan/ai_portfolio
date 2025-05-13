import { cn, debounce } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

import Message from './message';
import { Greeting } from './greeting';

import type { ChatStatus, MessageType } from '@/types';

export default function Messages({
  messages,
  status,
  handleRetry,
}: {
  messages: MessageType[];
  status: ChatStatus;
  handleRetry: () => void;
}) {
  const lastScrollTop = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const debouncedAutoScroll = debounce(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, 700);

  // Add scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container || status !== 'busy') return;

    const handleScroll = () => {
      const currentScrollTop = container.scrollTop;
      const scrollDifference = Math.abs(
        currentScrollTop - lastScrollTop.current,
      );

      // Only disable auto-scroll if there's a significant scroll difference
      // This helps prevent accidental triggers from small scroll movements
      if (scrollDifference > 10) {
        setShouldAutoScroll(false);
      }

      lastScrollTop.current = currentScrollTop;
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [status]);

  // Auto-scroll effect
  useEffect(() => {
    if (shouldAutoScroll) {
      debouncedAutoScroll();
    }
  }, [messages, shouldAutoScroll, debouncedAutoScroll]);

  useEffect(() => {
    if (status === 'loading') {
      setShouldAutoScroll(true);
    }
  }, [status]);

  return (
    <div
      className={cn(
        'flex size-full flex-col gap-4 overflow-y-scroll p-4 pr-5 pb-96',
        !messages.length && 'h-fit pb-0',
      )}
      ref={containerRef}
      onTouchStart={() => setShouldAutoScroll(false)}
    >
      {!messages.length ? (
        <Greeting />
      ) : (
        messages.map((msg, index) => (
          <Message
            key={index}
            message={msg}
            handleRetry={handleRetry}
            isError={status === 'error' && index === messages.length - 1}
            isLoading={status === 'loading' && index === messages.length - 1}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
