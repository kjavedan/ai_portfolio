export interface MessageType {
  role: 'user' | 'assistant';
  text: string;
}

export type ChatStatus = 'ready' | 'loading' | 'busy' | 'abort' | 'error';
