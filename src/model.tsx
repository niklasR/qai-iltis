export interface Message {
  id: string;
  text: string;
  from?: string;
  to?: string;
  timestamp: number;
  show: boolean;
}

export interface Ticker {
  show: boolean;
}

export interface UiElements {
  ticker: Ticker;
}

export interface AppData {
  messages: Message[];
  elements: UiElements;
}