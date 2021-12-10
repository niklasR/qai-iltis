export interface Message {
  id: string;
  text: string;
  from?: string;
  to?: string;
  attachment?: MessageAttachment;
  timestamp: number;
  show: boolean;
}

export interface MessageAttachment {
  mimetype: string;
  data: string;
  filename?: string | null;
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