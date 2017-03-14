const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('../keys/privkey.pem'),
  cert: fs.readFileSync('../keys/fullchain.pem')
};

var file = fs.readFileSync('../assets/100k');

var httpServer = new https.createServer(options).listen(443);
var wss = new WebSocket.Server({
  server: httpServer,
  perMessageDeflate: false
});

wss.on('connection', function(ws) {
  for (let i = 0; i < 100; i++) {
    ws.send(file);
  }
});
