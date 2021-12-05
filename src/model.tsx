export interface Message {
  id: string;
  text: string;
  from: string;
  timestamp: string;
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