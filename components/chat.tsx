import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ArrowUpIcon, LoaderCircle, Pause } from 'lucide-react';

import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

// Define the ChatStatus type if not already defined elsewhere
type ChatStatus = 'ready' | 'busy' | 'loading' | 'error' | 'abort';

interface ChatProps {
  input: string;
  status: ChatStatus;
  hasMessages: boolean;
  setInput: (value: string) => void;
  onSubmit: (text?: string) => void;
  handleAbort: () => void;
}

// Simple button component
function ChatButton({
  input,
  status,
  onClick,
}: {
  input: string;
  status: ChatStatus;
  onClick: (event: React.MouseEvent) => void;
}) {
  return (
    <Button
      data-testid="send-button"
      className="aspect-square w-fit rounded-full border p-1.5 dark:border-zinc-600"
      onClick={onClick}
      disabled={
        (!input.length && status === 'ready') ||
        status === 'error' ||
        status === 'abort'
      }
    >
      {status === 'busy' || status === 'loading' ? (
        <Pause />
      ) : status === 'abort' ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <ArrowUpIcon size={14} />
      )}
    </Button>
  );
}

export default function Chat({
  input,
  status,
  hasMessages,
  onSubmit,
  setInput,
  handleAbort,
}: ChatProps) {
  return (
    <div
      className={cn(
        'relative bottom-0 h-fit w-full px-4 pb-4 lg:px-0',
        hasMessages && 'absolute bottom-0 z-10 rounded-t-2xl md:absolute',
      )}
    >
      <Textarea
        data-testid="chat-input"
        placeholder="Send a message..."
        className={cn(
          'bg-muted dark:bg-muted',
          '!max-h-[300px] min-h-[120px] w-full resize-none overflow-y-auto rounded-2xl pr-8 pb-10',
          '!text-base dark:border-zinc-700',
        )}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(event) => {
          if (
            event.key === 'Enter' &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();

            if (status !== 'ready') {
              toast.error(status, {
                position: 'top-right',
              });
            } else {
              onSubmit();
            }
          }
        }}
      />
      <div className="absolute top-1 right-4 flex w-fit flex-row justify-end p-2">
        <ChatButton
          input={input}
          status={status}
          onClick={(event) => {
            event.preventDefault();
            if (status === 'ready') {
              onSubmit();
            } else {
              handleAbort();
            }
          }}
        />
      </div>
    </div>
  );
}
