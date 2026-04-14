import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

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
  const rafIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // User-scroll detection: only disable auto-scroll when user
  // deliberately scrolls up away from the bottom.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || status !== 'busy') return;

    const handleScroll = () => {
      const currentScrollTop = container.scrollTop;
      const delta = currentScrollTop - lastScrollTop.current;
      lastScrollTop.current = currentScrollTop;

      const distanceFromBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;

      if (delta < -10) {
        // Scrolled up meaningfully — stop auto-scroll
        setShouldAutoScroll(false);
      } else if (distanceFromBottom < 40) {
        // Back at the bottom — resume
        setShouldAutoScroll(true);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [status]);

  // Auto-scroll effect — rAF keeps it in sync with paint, and during
  // streaming we use 'auto' so each chunk feels continuous rather than
  // stacking overlapping smooth animations.
  useEffect(() => {
    if (!shouldAutoScroll) return;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = 0;
      const container = containerRef.current;
      if (!container) return;
      container.scrollTop = container.scrollHeight;
    });

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    };
  }, [messages, shouldAutoScroll]);

  useEffect(() => {
    if (status === 'loading') {
      setShouldAutoScroll(true);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [status]);

  return (
    <div
      className={cn(
        'flex size-full flex-col gap-4 overflow-y-scroll p-4 pr-5 pb-96 lg:pr-3 lg:pl-0',
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
