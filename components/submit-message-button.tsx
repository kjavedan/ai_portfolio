import { ArrowUpIcon } from 'lucide-react';

import { Button } from './ui/button';

import type { ChatStatus } from '@/types';

export default function SubmitMessageButton({
  input,
  status,
  onSubmit,
}: {
  input: string;
  status: ChatStatus;
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
      disabled={
        input.length === 0 ||
        status === 'busy' ||
        status === 'error' ||
        status === 'loading'
      }
    >
      <ArrowUpIcon size={14} />
    </Button>
  );
}
