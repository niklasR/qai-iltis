export enum DataChangeType {
  ADD_MESSAGE = 'addMessage',
  SHOW_MESSAGE = 'showMessage',
  REMOVE_MESSAGE = 'removeMessage',
  UNSHOW_MESSAGE = 'unshowMessage',
  UNARCHIVE_MESSAGE = 'unarchiveMessage',
  AMEND_FROM = 'amendFrom',
  TOGGLE_TICKER = 'toggleTicker',
  TOGGLE_IMAGE_CHROMA = 'toggleImageChroma'
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

export interface ImageChroma {
  show: boolean;
}

export interface UiElements {
  ticker: Ticker;
  imageChroma: ImageChroma;
}

export interface AppData {
  messages: Message[];
  elements: UiElements;
}