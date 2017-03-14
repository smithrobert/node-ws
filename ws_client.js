const WebSocket = require('ws');
const url = 'https://mywebsite.me';

var hrstart = process.hrtime();
const ws = new WebSocket(url, {
  perMessageDeflate: false
});

var count = 0;
ws.on('message', function incoming(data) {
  let hrend = process.hrtime(hrstart);
  console.info('%d: Package received: %ds %dms', ++count, hrend[0], hrend[1]/1000000);
});
