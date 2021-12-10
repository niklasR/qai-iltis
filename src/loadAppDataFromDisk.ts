import * as fs from 'fs';
import { AppData, MessageState } from "./model";
import { APPDATA_PERSISTENCE_FILE_PATH } from './server';

export function loadAppDataFromDisk(): AppData {
  try {
    const appData = JSON.parse(fs.readFileSync(APPDATA_PERSISTENCE_FILE_PATH, 'utf-8'));
    return appData;
  } catch (error) {
    return {
      messages: [
        {
          id: 'd7740221-6061-46f2-b2aa-e31837506a19',
          from: 'Nik',
          text: 'Hey there people, I\'m just testing the message implementation',
          timestamp: 1638736119172,
          state: MessageState.SHOWING
        },
        {
          id: 'af603643-1c88-494a-be00-cf951fb3c0cc',
          from: 'Pete Ludlow',
          text: 'You do know these are all just hardcoded dummies, don\'t you? 👻',
          timestamp: 1638736124256,
          state: MessageState.SHOWING
        }
      ],
      elements: {
        ticker: {
          show: true
        }
      }
    };
  }
}
