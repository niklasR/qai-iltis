export enum DataChangeType {
  addMessage,
  showMessage,
  ignoreMessage,
  removeMessage
}

export interface Message {
  id: string;
  text: string;
  from?: string;
  to?: string;
  timestamp: number;
  state: MessageState;
}

export enum MessageState {
  ARRIVED = 'arrived',
  SHOWING = 'showing',
  REMOVED = 'removed',
  IGNORED = 'ignored'
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