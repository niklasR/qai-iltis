export enum DataChangeType {
  ADD_MESSAGE = 'addMessage',
  SHOW_MESSAGE = 'showMessage',
  IGNORE_MESSAGE = 'ignoreMessage',
  REMOVE_MESSAGE = 'removeMessage',
  AMEND_FROM = 'amendFrom'
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