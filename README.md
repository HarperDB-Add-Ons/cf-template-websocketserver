# WebSocket Server in HarperDB Custom Functions

This implements a WebSocket Server in a HarperDB Custom Function.
It's a simple server template that launches on port 8080 and inserts data to a table called "messages".

---

## Setup

To start the local instance run `make`. This will launch HarperDB with the ws-server CF.

## Client

Once the server is running, there's an example client in `client.js` that will send in a message.
Run this with `node client.js` and confirm the data exists with the Studio - checking the hdb_one.messages table.
