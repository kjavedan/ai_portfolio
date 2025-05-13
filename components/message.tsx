import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, SparklesIcon } from 'lucide-react';

import { Button } from './ui/button';
import { Markdown } from './markdown';
import BouncingEllipsis from './bouncing-ellipsis';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

import type { MessageType } from '@/types';

export default function Message({
  message,
  isError,
  isLoading,
  handleRetry,
}: {
  message: MessageType;
  isError: boolean;
  isLoading: boolean;
  handleRetry: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        data-testid={`message-${message.role}`}
        className="group/message mx-auto w-full max-w-3xl p-[1px]"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role={message.role}
      >
        {message.role === 'assistant' && (
          <AssistantMessage
            text={message?.text}
            isError={isError}
            isLoading={isLoading}
            handleRetry={handleRetry}
          />
        )}
        {message.role === 'user' && <UserMessage text={message?.text} />}
      </motion.div>
    </AnimatePresence>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div
      data-testid="message-content"
      className={
        'bg-primary text-primary-foreground ml-auto w-fit rounded-3xl px-3 py-2'
      }
    >
      <Markdown>{text}</Markdown>
    </div>
  );
}

function AssistantMessage({
  text,
  isError,
  isLoading,
  handleRetry,
}: {
  text: string;
  isError: boolean;
  isLoading: boolean;
  handleRetry: () => void;
}) {
  return (
    <div className="flex flex-row items-start gap-2">
      <div className="ring-border bg-background flex size-7 shrink-0 items-center justify-center rounded-full ring-1">
        <div className="translate-y-px">
          <SparklesIcon size={12} />
        </div>
      </div>
      <div className="w-full">
        {isLoading ? <BouncingEllipsis /> : <Markdown>{text}</Markdown>}

        {isError && (
          <Alert variant={'destructive'} className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              An unexpected error accuried please try again
              <Button
                variant={'outline'}
                onClick={handleRetry}
                className="text-primary mt-2"
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
