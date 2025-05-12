import { cn } from '@/lib/utils';

import { Textarea } from './ui/textarea';
import SubmitMessageButton from './submit-message-button';

interface ChatProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: () => void;
  status: 'ready' | 'loading' | 'busy' | 'error';
  hasMessages: boolean;
}

export default function Chat({
  input,
  status,
  hasMessages,
  //
  onSubmit,
  setInput,
}: ChatProps) {
  return (
    <div
      className={cn(
        'bg-background relative bottom-0 h-fit w-full p-4',
        hasMessages && 'absolute bottom-0 rounded-t-2xl md:absolute',
      )}
    >
      <Textarea
        data-testid="chat-input"
        placeholder="Send a message..."
        className={
          'bg-muted !max-h-[300px] min-h-[120px] w-full resize-none overflow-y-auto rounded-2xl pr-8 pb-10 !text-base dark:border-zinc-700'
        }
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
              console.log('error');
            } else {
              onSubmit();
            }
          }
        }}
      />
      <div className="absolute top-4 right-4 flex w-fit flex-row justify-end p-2">
        <SubmitMessageButton input={input} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
