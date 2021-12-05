import * as fs from 'fs/promises';
import * as  qrcode from 'qrcode-terminal';
import WAWebJS, { Client } from 'whatsapp-web.js';
import { v4 as uuidv4 } from 'uuid';
import EventEmitter from 'events';

import { Message } from './model';

const SESSION_FILE_PATH = __dirname + '/../session.json';

class ContactsDb {
  private contacts: WAWebJS.Contact[];

  constructor(contacts: WAWebJS.Contact[]) {
    this.contacts = contacts;
  }

  public getName(id: string) {
    const contact = this.contacts.find((contact) => {
      return contact.id._serialized === id;
    });
    return contact?.name ?? id;
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => { };

export class WhatsAppClient extends EventEmitter{
  private _client?: Client;
  private _contacts?: ContactsDb;
  private _isInitialised: boolean;

  constructor() {
    super();
    this._isInitialised = false;
  }

  get client() {
    return this._client;
  }

  get getContactName() {
    return this._contacts?.getName || noop;
  }

  get isInitialised() {
    return this._isInitialised;
  }

  async init() {
    this._client = await this.createClient();
    const rawContacts = await this._client.getContacts();
    this._contacts = new ContactsDb(rawContacts);

    this._client.on('message_create', (message) => {
      const from = this._contacts?.getName(message.from);
      const to = this._contacts?.getName(message.to);
      const simpleMessage: Message = { 
        id: uuidv4(),
        text: message.body,
        from,
        to,
        timestamp: Date.now(),
        show: false,
      };
      this.emit('message', simpleMessage);
    });

    this._client.on('disconnected', (reason) => {
      console.log('WAC: disconnected', reason);
    });

    this._client.on('auth_failure', (reason) => {
      console.log('WAC: auth_failure', reason);
    });

    this._client.on('change_state', (reason) => {
      console.log('WAC: change_state', reason);
    });
    console.log('WAC: Initialised client.');
    this._isInitialised = true;
    return this._client;
  }

  private async loadSessionFromDisk(): Promise<any> {
    try {
      const session = JSON.parse(await fs.readFile(SESSION_FILE_PATH, 'utf-8'));
      return session;
    } catch (error) {
      console.log(`WAC: No session found: ${(error as Error).message}.`);
      return;
    }
  }

  private async createClient(): Promise<Client> {
    console.log('WAC: Initialising..');
    const session = await this.loadSessionFromDisk();
    if (session) {
      console.log('WAC: Found previous session. Loading..');
      const client = new Client({
        session
      });
      await client.initialize();
      return client;
    }

    console.log('WAC: Creating client without session');
    const client = new Client({});

    client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });

    client.on('authenticated', async (session) => {
      console.log('WAC: Authenticated. Storing session.');
      try {
        await fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), 'utf-8');
        console.log('WAC: Stored session');
      } catch (error) {
        return console.log('WAC: Failed writing session file', (error as Error).message);
      }
    });

    client.on('ready', () => {
      console.log('WAC: Client is ready!');
    });

    await client.initialize();
    return client;
  }
}
