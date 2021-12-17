export enum DataChangeType {
  ADD_MESSAGE = 'addMessage',
  SHOW_MESSAGE = 'showMessage',
  REMOVE_MESSAGE = 'removeMessage',
  UNSHOW_MESSAGE = 'unshowMessage',
  UNARCHIVE_MESSAGE = 'unarchiveMessage',
  AMEND_FROM = 'amendFrom',
  AMEND_TEXT = 'amendText',
  TOGGLE_TICKER = 'toggleTicker',
  TOGGLE_IMAGE_CHROMA = 'toggleImageChroma'
}

export interface Message {
  id: string;
  text: string;
  from?: string;
  to?: string;
  attachment?: Attachment;
  timestamp: number;
  state: MessageState;
}

export enum MessageState {
  ARRIVED = 'arrived',
  SHOWING = 'showing',
  SHOWN = 'shown',
  BIN = 'binned'
}

export interface Attachment {
  mimetype: string;
  url: string;
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