// TODO
//  Win condition
//  Challenge Button
//    (dictionary)
//  Tile Swap (From bag)
//  Tile Swap (Within hand)
//  Drag to place
//  Accurate graphics regardless of screen size
//  IP address based identification
//  Production
//  Presentation

const express = require("express");
const path = require("path");
const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;
const production = false;

app.use(express.static(path.join(__dirname, "./static")));


// Setting up multiplayer variables
board = [
  ['','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','']
];
tileBag = [
  'A','A','A','A','A','A','A','A','A',
  'B','B',
  'C','C',
  'D','D','D','D',
  'E','E','E','E','E','E','E','E','E','E','E','E',
  'F','F',
  'G','G','G',
  'H','H',
  'I','I','I','I','I','I','I','I','I',
  'J',
  'K',
  'L','L','L','L',
  'M','M',
  'N','N','N','N','N','N',
  'O','O','O','O','O','O','O','O',
  'P','P',
  'Q',
  'R','R','R','R','R','R',
  'S','S','S','S',
  'T','T','T','T','T','T',
  'U','U','U','U',
  'V','V',
  'W','W',
  'X',
  'Y','Y',
  'Z',
  '_blank', '_blank'
];

turnNum = 0
playerNum = -1;
playerScores = []
maxPlayerNum = -1;
for(var i = 0; i < playerNum; i++)
  playerScores.push(0);

var clients = new Map();
var clientId = 0;

function aKey(aSocket) {
  if (production) return aSocket.handshake.address;
  else return aSocket.id;
}

io.on("connection", function (socket) {
  // remember this socket id
  console.log("connection: " + socket.id + " clientId: " + clientId + " key: " + aKey + " New Player: " + playerNum);
  
  socket.on("print", function (msg) { 
    console.log(msg);
  });

  socket.on("play", function (msg) { 
    // console.log("this is a test, ln 38 index.js");
    board = msg.board;
    console.log(board);
    
    turnNum = (turnNum+1)%(playerNum+1);
    playerScores = msg.playerScores;
    // Getting new tiles
    io.emit("updateVars", { playerNum: playerNum, playerScores:playerScores, turnNum:turnNum, board:board});
  });

  socket.on("requestTiles", function(msg){
    // Replacing tiles
    drawNum = msg
    tiles = [];
    for (let i = 0; i < drawNum; i++) {
      var tile = tileBag[Math.floor(Math.random()* tileBag.length)];
      const ind = tileBag.indexOf(tile);
      if (ind != -1) {
          tileBag.splice(ind, 1);
      }
      tiles.push(tile);
    }
    socket.emit("receiveTiles", tiles);
  });

  socket.on("draw", function(msg){
    msg.placedNum
  });

  playerNum++;
  if(playerNum > maxPlayerNum)
  {
    console.log("adding new score slot");
    
    maxPlayerNum = playerNum;
    playerScores.push(0);
  }
  io.emit("updateVars", { playerNum: playerNum, playerScores:playerScores, turnNum:turnNum, board:board});

  var aKey = socket.id;
  clients.set(aKey, { id: playerNum });

  socket.on('disconnect', function() {
    console.log("disconnect from: " + socket.io + "  ip: " + socket.handshake.address);
    playerNum--;
  });

});

http.listen(port, function () {
  console.log("listening on port " + port);
});


app.get("/", function (req, res) {
  console.log("HUGE TEST TIME!!!!!!    :::::    "+clientId);
  if(clientId < 4)
    res.sendFile(__dirname + "./index.html");
});
