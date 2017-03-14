const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');

var files = [];
for (let i = 0; i <= 100; i++) {
  files[i] = fs.readFileSync('../assets/' + i + "k");
}

const options = {
  key: fs.readFileSync('../keys/privkey.pem'),
  cert: fs.readFileSync('../keys/fullchain.pem')
};

var httpServer = new https.createServer(options).listen(443);
var wss = new WebSocket.Server({
  server: httpServer,
  perMessageDeflate: false
});

wss.on('connection', function(ws) {
  for (let i = 0; i < files.length; i++) {
    ws.send(files[i]);
  }
});
