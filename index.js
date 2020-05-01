// TODO
//  Win condition
//  Challenge Button
//    (dictionary)
//  Tile Swap (Within hand)
//  Drag to place
//  IP address based identification
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
var tilePoints = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
  _blank:0
};


playerIPs = [0,0,0,0];
playersPesent = [false, false, false, false];
turnNum = 0
playerNum = 0;
playerScores = []
playerLimit = 4;
maxPlayerNum = -1;
timePerTurn = 60
hands = [
  ["","","","","","",""],
  ["","","","","","",""],
  ["","","","","","",""],
  ["","","","","","",""]
]

units_per_time = 1000

for(var i = 0; i < playerNum; i++)
  playerScores.push(0);

var clients = new Map();

function endTurn()
{
  for(var i = 0; i < playerLimit; i++)
  {
    if(playerNum < playerLimit)
      turnNum = (turnNum+1)%(playerNum);
    else
      turnNum = (turnNum+1)%(playerLimit);

    if(playersPesent[turnNum])
      break;
  } 
  // Getting new tiles
  io.emit("updateVars", { playerNum: playerNum, playerScores:playerScores, turnNum:turnNum, board:board});
}

time = 0;
timersGoing = 0
function startTimer() {
  time = timePerTurn
  io.emit("updateTimer", time);
  timersGoing++;
  setTimeout(timerCountdown, units_per_time)
}

timerCanGo = false
function timerCountdown(){
  if(!timerCanGo)
  {
    timersGoing--;
    console.log("Timer Can't go");
    return;
  }
  if(timersGoing > 1)
  {
    timersGoing = 1;
    return;
  }
  time--;
  if(time < 0)
  {
    timersGoing--;
    // Stop timer
    endTurn()
    startTimer();
    return;
  }
  io.emit("updateTimer", time);
  setTimeout(timerCountdown, units_per_time)
}

function aKey(aSocket) {
  if (production) return aSocket.handshake.address;
  else return aSocket.id;
}

io.on("connection", function (socket) {
  if(!clients.get(aKey(socket))){
    console.log(aKey(socket)+ " CLIENTS ADDING "+ playerNum);

    clients.set(aKey(socket), playerNum);
  }
  playerNum++;

  socket.on("reset", function() {
    timerCanGo = false;
    turnNum = 0
    playerScores = []
    maxPlayerNum = -1;
    hands = [
      ["","","","","","",""],
      ["","","","","","",""],
      ["","","","","","",""],
      ["","","","","","",""]
    ]
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
    io.emit("updateVars", { playerNum: playerNum, playerScores:playerScores, turnNum:turnNum, board:board});
    io.emit("resetIndiv");
  });
  // remember this socket id
  // console.log("connection: " + socket.id + " key: " + aKey + " New Player: " + playerNum);
  
  socket.on("print", function (msg) { 
    console.log(msg);
  });

  socket.on("play", function (msg) { 
    timerCanGo = true
    startTimer();
    // console.log("this is a test, ln 38 index.js");
    board = msg.board;
    // console.log(board);
    
    endTurn();

    playerScores = msg.playerScores;
    // Getting new tiles
    io.emit("updateVars", { playerNum: playerNum, playerScores:playerScores, turnNum:turnNum, board:board});
  });

  socket.on("requestStartingVars", function(msg) {
    ID = clients.get(aKey(socket));
    console.log("ID  ::: "+ID);
    console.log("playerNum  ::: "+playerNum);
    console.log("playersPesent[ID]  ::: "+playersPesent[ID]);
    
    
    if(ID < playerNum-1) { // Player is rejoining
      if(playersPesent[ID]) { // Already here
        socket.emit("receiveStartingVars", {ID:-1})
      } else {
        console.log("Welcoming pre-existing Player");
        console.log("playersPesent[ID] " + playersPesent[ID]);
        socket.emit("receiveStartingVars", {ID:ID, hand:hands[ID]})
        playersPesent[ID] = true;
        io.emit("updateVars", { playerNum: playerNum, playerScores:playerScores, turnNum:turnNum, board:board});
      }
    } else if(ID < playerLimit) {
      playersPesent[playerNum] = true;

      console.log("Adding Player");
      if(playerNum > maxPlayerNum && playerNum < playerLimit)
      {
        console.log("adding new score slot");
        
        maxPlayerNum = playerNum;
        playerScores.push(0);
      }
      io.emit("updateVars", { playerNum: playerNum, playerScores:playerScores, turnNum:turnNum, board:board});
      socket.emit("receiveStartingVars", {ID:ID})
    } else { // is new spectator
      console.log("Adding Spectator");
      socket.emit("receiveStartingVars", {ID:-1})
    }
  });

  socket.on("requestTiles", function(msg){
    oldHand = msg.oldHand;
    ID = msg.ID;

    if(msg.swapped){
      swapped = msg.swapped;
      swappedTiles = []
      for(var i = 0; i < swapped.length; i++)
      {
        swappedTiles.push(hands[ID][swapped[i]]);
        oldHand[swapped[i]] = '';
      }
      tileBag.concat(swappedTiles);
      endTurn();
    }
    
    // Replacing tiles
    for (let i = 0; i < hands[ID].length; i++) {
      if(oldHand[i] == '')
      {
        var tile = tileBag[Math.floor(Math.random()*tileBag.length)];
        if(tile != null) {
          const ind = tileBag.indexOf(tile);
          if (ind != -1) {
              tileBag.splice(ind, 1);
          }
          hands[ID][i] = tile;
        }
        else
          hands[ID][i] = '';
      }
    }

    socket.emit("receiveTiles", hands[ID]);

    // There are no more tiles in the bag or the persons hand
    //  This is a win condition
    empty = true
    for (let u = 0; u < hands[ID].length && empty; u++) {
      if(hands[ID][u] != '')
        empty = false;
    }

    if(empty)
    {
      console.log("Game Over: player "+ID+" went out");
      
      bonus = 0;
      for (let i = 0; i < hands.length; i++) {
        tempBonus = 0
        for (let x = 0; x < hands[i].length; x++) {
          if(tilePoints[hands[i][x]])
            tempBonus += tilePoints[hands[i][x]]
          hands[i][x] = '';
        }
        bonus += tempBonus;
        if(i != ID)
          playerScores[i] -= tempBonus;
      }
      playerScores[ID] += bonus;
      io.emit("victory", {ID:ID, bonus:bonus})
      timerCanGo = false;
      io.emit("updateVars", { playerNum: playerNum, playerScores:playerScores, turnNum:turnNum, board:board});
    }
  });

  socket.on('disconnect', function() {
    ID = clients.get(aKey(socket));

    if(ID >= playerLimit)   
      console.log("Spectator left");
    if(ID <= playerLimit) {
      console.log("Player left");
      playersPesent[ID] = false;
    }
    if(playerNum > -1)
      playerNum--;
  });

});

http.listen(port, function () {
  console.log("listening on port " + port);
});


app.get("/", function (req, res) {
  res.sendFile(__dirname + "./index.html");
});
