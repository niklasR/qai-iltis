## Requirements

- Node 16

On my mac, an `npm install` gave me some errors which i resolved by :

- `brew install vips`: Installs vips, which is needed by puppeteer
- `brew unlink ilmbase && brew link imath`: Sets up imath correctly for puppetteer

(assuming [homebrew](https://brew.sh/) is set up)

Before I could actually run it, I also had to manually run the puppeteer install scripts. For some reason they only worked in debug mode:

```DEBUG=puppeteer:fetcher node node_modules/puppeteer/install.js```

## Running it

`TS_NODE_CACHE=FALSE npm run start` starts a server on http://localhost:8080, serving the `index.html` and react app.

The react app has routes configured:
- `/`: Home for the control plane with nav bar

The console should start showing the WhatsApp pairing instructions (a QR code) after some loading.
The pairing process is completed when `Initialised client.` is displayed.

After the first successful authentiction to WhatsApp, the session information is stored in a session.json, which is then reloaded on subsequent starts.

## Structure

- whatsapp.ts does all the whatsapp event stuff, and itself emits any message in a simple format. It's just a wrapper around the authentication mechanism, event handling, and the contact list/lookup, using whatsapp-web.js. 
- index.ts calls the whatsapp.ts, and forwards messages to all connected browser sockets
- when a new browser connects, its socket is stored in the global `activeSockets` Set, which it uses to forward messages to

