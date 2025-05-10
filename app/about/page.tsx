'use client';

import { useRef, useState } from 'react';
import { ArrowUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Greeting } from '@/components/greeting';
import Suggestion from '@/components/suggestion';
import { Textarea } from '@/components/ui/textarea';

export default function About() {
  /**
   * what you want to do here?
   * I want to have a ui similar to grok or openai, a textbox and a list of suggestion under the text box
   * you can learn from the ai-chatbot ui only
   * when we don't hvae messages we can show suggestins and keep the greeting
   */
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [input, setInput] = useState<string>('');
  console.log('🚀 ~ About ~ input:', input);

  const handleSubmit = () => {
    console.log(input);
  };

  return (
    <div className="relative size-full">
      <Greeting />
      <div className="bg-background absolute bottom-0 left-0 h-fit w-full pt-4 lg:relative">
        <Textarea
          data-testid="chat-input"
          ref={textareaRef}
          placeholder="Send a message..."
          className={
            'bg-muted max-h-[calc(75dvh)] min-h-[120px] resize-none overflow-hidden rounded-2xl pb-10 !text-base dark:border-zinc-700'
          }
          rows={2}
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
                // toast.error('Please wait for the model to finish its response!');
              } else {
                handleSubmit();
              }
            }
          }}
        />
        <div className="absolute top-4 right-0 flex w-fit flex-row justify-end p-2">
          <SendButton input={input} onSubmit={handleSubmit} />
        </div>
      </div>
      <Suggestion />
    </div>
  );
}

function SendButton({
  input,
  onSubmit,
}: {
  input: string;
  onSubmit: () => void;
}) {
  return (
    <Button
      data-testid="send-button"
      className="aspect-square w-fit rounded-full border p-1.5 dark:border-zinc-600"
      onClick={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      disabled={input.length === 0}
    >
      <ArrowUpIcon size={14} />
    </Button>
  );
}
