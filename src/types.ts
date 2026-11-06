
export interface MessageStats {
  totalDuration: number;   
  tokensPerSecond: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  stats?: MessageStats;
}

export interface OllamaResponse {
  response: string;
  total_duration: number;
  eval_count: number;
  eval_duration: number;
}