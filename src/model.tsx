export enum DataChangeType {
  ADD_MESSAGE = 'addMessage',
  SHOW_MESSAGE = 'showMessage',
  REMOVE_MESSAGE = 'removeMessage',
  UNSHOW_MESSAGE = 'unshowMessage',
  AMEND_FROM = 'amendFrom'
}

export interface Message {
  id: string;
  text: string;
  from?: string;
  to?: string;
  attachment?: MessageAttachment;
  timestamp: number;
  state: MessageState;
}

export enum MessageState {
  ARRIVED = 'arrived',
  SHOWING = 'showing',
  SHOWN = 'shown',
  BIN = 'binned'
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