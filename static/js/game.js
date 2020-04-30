//  Setting Up Major game variables -----------------------------------------
var socket = io();
tempTileLocs = [null,null,null,null,null,null,null];

swapped = [];
isSwapping = false;
// Stores the points per tile
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
var letters = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N',
  'O','P','Q','R','S','T','U','V','W','X','Y','Z', "_blank"
];

// Loading tile images and values
var tiles = {};
for(var i = 0; i < 27; i++){
  tiles[letters[i]] = {
      val: tilePoints[letters[i]],
      img: new Image(),
      img_selected: new Image()
  };
  tiles[letters[i]].img_selected.src = "img/letters_selected/"+letters[i]+".png";
  tiles[letters[i]].img.src = "img/letters/"+letters[i]+".png";
}

// Stores what letter is where on the board
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
]

boardTemp = [
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
]
// Where modifirers are on the board
modifiers = [
  ['3W','  ','  ','2L','  ','  ','  ','3W','  ','  ','  ','2L','  ','  ','3W'],
  ['  ','2W','  ','  ','  ','3L','  ','  ','  ','3L','  ','  ','  ','2W','  '],
  ['  ','  ','2W','  ','  ','  ','2L','  ','2L','  ','  ','  ','2W','  ','  '],
  ['2L','  ','  ','2W','  ','  ','  ','2L','  ','  ','  ','2W','  ','  ','2L'],
  ['  ','  ','  ','  ','2W','  ','  ','  ','  ','  ','2W','  ','  ','  ','  '],
  ['  ','3L','  ','  ','  ','3L','  ','  ','  ','3L','  ','  ','  ','3L','  '],
  ['  ','  ','2L','  ','  ','  ','2L','  ','2L','  ','  ','  ','2L','  ','  '],
  ['3W','  ','  ','2L','  ','  ','  ','2W','  ','  ','  ','2L','  ','  ','3W'],
  ['  ','  ','2L','  ','  ','  ','2L','  ','2L','  ','  ','  ','2L','  ','  '],
  ['  ','3L','  ','  ','  ','3L','  ','  ','  ','3L','  ','  ','  ','3L','  '],
  ['  ','  ','  ','  ','2W','  ','  ','  ','  ','  ','2W','  ','  ','  ','  '],
  ['2L','  ','  ','2W','  ','  ','  ','2L','  ','  ','  ','2W','  ','  ','2L'],
  ['  ','  ','2W','  ','  ','  ','2L','  ','2L','  ','  ','  ','2W','  ','  '],
  ['  ','2W','  ','  ','  ','3L','  ','  ','  ','3L','  ','  ','  ','2W','  '],
  ['3W','  ','  ','2L','  ','  ','  ','3W','  ','  ','  ','2L','  ','  ','3W']
]
// Setting up empty hand
var hand = ['','','','','','',''];
// ------------------------------------------------------------------------------------

// Setting up lesser variables ----------------------------

// Multiplayer variables
var turnNum = -1;
var playerID = -1;
var isSpectating = false;
socket.emit("requestID");
socket.on("receiveID", function(ID) {
  console.log("getting ID :: "+ID);
  
  playerID = ID;
  if(ID == -1)
    isSpectating = true;
  else
    socket.emit("requestTiles", {count:7});
  renderBoard();
});

var playerNum = -1;
var playerScores = -1;

// Local variables
var selected = "";
var selectedNum = -1;
var lastCol = -1
var lastRow = -1
var isVertical;
var placedNum = 0;
var removal = { x: -1, y:-1};

// This calls when you emit "requestTiles". the server 
//  sends you the requested number of tiles
socket.on("receiveTiles", function(tiles){
  num = 0
  for (let i = 0; i < hand.length && tiles[num]; i++) {
    if(hand[i] == '')
      hand[i] = tiles[num++];
  }
  renderHand();
});

function toTimeForm(time) {
  s = ""
  s += Math.floor(time/60)+":"
  time %= 60;
  s += Math.floor(time/10);
  time %= 10;

  console.log(s + time);

  return s + time;
}

function getTempTilesFromBoard(){
  for(var i = 0; i < tempTileLocs.length; i++) {
    if(tempTileLocs[i]) {
      x = tempTileLocs[i].x;
      y = tempTileLocs[i].y;

      hand[i] = boardTemp[y][x];
      boardTemp[y][x] = '';
      tempTileLocs[i] = null;
    }
    selected = "";
    selectedNum = -1;
    placedNum = 0;
    lastCol = -1;
    lastRow = -1;
    renderBoard();
    renderHand();
  }
}

socket.on("updateTimer", function(time){
  
  if(time <= 10)
    $("#timerText")[0].style.color = "red"
  else
    $("#timerText")[0].style.color = "lightgrey"

  $("#timerText").text(toTimeForm(time));
});

// Comes from the server to update local variables
socket.on("updateVars", function (msg) {
  getTempTilesFromBoard();
  renderHand();

  boardTemp = msg.board;
  board = [];
  boardTemp.forEach(element => {
    board.push([...element])
  });
  
  console.log(msg);  
  turnNum = msg.turnNum;

  playerNum = msg.playerNum;
  playerScores = msg.playerScores;
  selected = "";
  selectedNum = -1;
  placedNum = 0;
  lastCol = -1;
  lastRow = -1;
  renderBoard();
});
// --------------------------------------------------------

// Setting up board board GUI ------------------
//Setting up canvas
spectatingLabel = $("#spectatingLabel")[0];
var canvas = $("canvas")[0];
WIDTH = -1;
HEIGHT = -1;

setCanvasSize()
var ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", function (evt) {
  // Do nothing if player is spectator
  if(isSpectating)
    return;

  // Removing already placed tile
  if(removal.x != -1 && removal.y != -1)
  {
    placedNum--;
    for (let i = 0; i < 7; i++) {
      if(tempTileLocs[i] && tempTileLocs[i].x == removal.x && tempTileLocs[i].y == removal.y){
        hand[i] = boardTemp[removal.y][removal.x];
        boardTemp[removal.y][removal.x] = '';
        tempTileLocs[i] = null;
        renderHand();
        renderBoard();
        break;
      }
    }
    if(placedNum == 1)
    {
      for (let i = 0; i < 7; i++) {
        if(tempTileLocs[i])
        {
          lastRow = tempTileLocs[i].y;
          lastCol = tempTileLocs[i].x;
        }
      }
    }
  }
  if(selected != "")
  {   
      gridNum = getMouseGridNum(evt);
      place(gridNum, selected);
  }
});

function getConnectedTileCoords(_board, coords){
  ret = []
  // Checking to the right
  walkerX = coords.x+1;
  while(_board[coords.y][walkerX] && _board[coords.y][walkerX] != '')
  {
    ret.push({x:walkerX, y:coords.y});
    walkerX++;
  }

  // Checking to the left
  walkerX = coords.x-1;
  while(_board[coords.y][walkerX] && _board[coords.y][walkerX] != '')
  {
    ret.push({x:walkerX, y:coords.y});
    walkerX--;
  }

  // Checking below
  walkerY = coords.y+1;
  while(_board[walkerY] && _board[walkerY][coords.x] != '')
  {
    ret.push({x:coords.x, y:walkerY});
    walkerY++;
  }

  // Checking above
  walkerY = coords.y-1;
  while(_board[walkerY] && _board[walkerY][coords.x] != '')
  {
    ret.push({x:coords.x, y:walkerY});
    walkerY--;
  }

  return ret;
}

function score(){
  _score = 0;

  tempModifiers = []
  for(var i = 0; i < 15; i++)
  {
    tempModifiers.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  }
  
  for(var i = 0; i < 7; i++){
    tileLoc = tempTileLocs[i];
    
    if(tileLoc != null)
    {
      x = tileLoc.x;
      y = tileLoc.y;
      tempModifiers[y][x] = 1;

      double = false;
      // Checking for double axis play
      if(placedNum > 1)
        if(isVertical == true){
          if(boardTemp[y][x-1] && boardTemp[y][x-1] != '')
            double = true
          if(boardTemp[y][x+1] && boardTemp[y][x+1] != '')
            double = true
        }
        if(isVertical == false) {
          if(boardTemp[y-1] && boardTemp[y-1][x] && boardTemp[y-1][x] != '')
            double = true
          if(boardTemp[y+1] && boardTemp[y+1][x] && boardTemp[y+1][x] != '')
            double = true
        }
      if(placedNum == 1)
      {
        hasHorizontal = false;
        hasVertical = false;
        if(boardTemp[y-1] && boardTemp[y-1][x] && boardTemp[y-1][x] != '')
          hasVertical = true        
        if(boardTemp[y+1] && boardTemp[y+1][x] && boardTemp[y+1][x] != '')
          hasVertical = true        
        if(boardTemp[y]   && boardTemp[y][x-1] && boardTemp[y][x-1] != '')
          hasHorizontal = true;
        if(boardTemp[y]   && boardTemp[y][x+1] && boardTemp[y][x+1] != '')
          hasHorizontal = true;

        double = hasHorizontal&& hasVertical;
      }
      soloMult = 1
      if(modifiers[y][x] == '2L' || modifiers[y][x] == "2W")
        soloMult = 2;
      if(modifiers[y][x] == '3L' || modifiers[y][x] == "3W")
        soloMult = 3;

      if(double)
        _score += tilePoints[boardTemp[y][x]]*soloMult;

      cons = getConnectedTileCoords(board, {x:x, y:y});
      
      // Changing connected tiles temp modifier value
      for(var j = 0; j < cons.length; j++){
        con = cons[j];
        tempModifiers[con.y][con.x] = 1;
      };
    }
  };
  
  for(var i = 0; i < 7; i++){
    tileLoc = tempTileLocs[i];
    if(tileLoc != null)
    {
      x = tileLoc.x;
      y = tileLoc.y;
      if(modifiers[y][x] == '2L')
        tempModifiers[y][x] *= 2;
      if(modifiers[y][x] == '3L')
        tempModifiers[y][x] *= 3;
      
      wordMod = -1;
      if(modifiers[y][x] == '2W')
        wordMod = 2;
      if(modifiers[y][x] == '3W')
        wordMod = 3;

      
      if(wordMod != -1)
      { 
        tempModifiers[y][x] *= wordMod;
        cons1 = getConnectedTileCoords(boardTemp, {x:x,y:y});
        cons2 = tempTileLocs;

        for (let c = 0; c < cons1.length; c++) {
          const con = cons1[c];
          tempModifiers[con.y][con.x] *= wordMod;
        }
      }
    }
  }

  for(var i = 0; i < 15; i++)
  {
    for(var j = 0; j < 15; j++)
    {
      letter = boardTemp[i][j]
      if(letter != '')
        _score += tilePoints[letter]*tempModifiers[i][j];
    }
    
  }
  if(placedNum == 7)
    _score += 50;

  return _score;
}

function getAdjstedCoord(axis, coord)
{
  if(axis == "x")
    return (coord/1280)*WIDTH;
  if(axis == "y")
    return (coord/726)*HEIGHT;
}

function isValidPlay()
{
  // Getting relative locations to check for grouping
  var locs = []
  var constCoord = -1;
  variableAxis = ""
  constantAxis = "";
  if(isVertical){
    variableAxis = "y"
    constantAxis = "x";
  } else{
    variableAxis = "x"
    constantAxis = "y";
  }

  for (let i = 0; i < tempTileLocs.length; i++) {
    if(tempTileLocs[i])
    {
      var constCoord = tempTileLocs[i][constantAxis];
      locs.push(tempTileLocs[i][variableAxis]);
    }
  }
  // Checking for grouping
  locs.sort(function(a, b){return a-b});

  var isGrouped = true;
  for (let i = locs[0]; i < locs[locs.length-1] && isGrouped; i++) {
      if(isVertical){
        if(board[i][constCoord] == '' && boardTemp[i][constCoord] == '')
          isGrouped = false;
      } else {
        if(board[constCoord][i] == '' && boardTemp[constCoord][i] == '')
          isGrouped = false;
      }
  }
  if(!isGrouped)
    return false;

  // Checking for adjacency of already played tiles.
  var notConnected = true;
  for (let i = 0; i < tempTileLocs.length && notConnected; i++) {
    t = tempTileLocs[i]
    if(t)
    {
      // If any of the tiles are played on the middle cell
      if(t.x == 7 && t.y == 7)
      {
        return true;
      }
        if(board[t.y][t.x-1] && board[t.y][t.x-1] != '')
          notConnected = false;
        if(board[t.y][t.x+1] && board[t.y][t.x+1] != '')
          notConnected = false;
        if(board[t.y-1] && board[t.y-1][t.x] && board[t.y-1][t.x] != '')
          notConnected = false;
        if(board[t.y+1] && board[t.y+1][t.x] && board[t.y+1][t.x] != '')
          notConnected = false;
      }
  }

  return !notConnected;
}
canvas.addEventListener("mousemove", function (evt) {
  coords = getMouseGridNum(evt);
  // If mouse is over board
  if(coords.x <= 14 && coords.y <= 14 && coords.x >= 0 && coords.y >= 0)
  {
    
    // If it is hovering over a tile this person placed but has not yet played...
    if(board[coords.y][coords.x] != boardTemp[coords.y][coords.x])
    {
      removal.x = coords.x;
      removal.y = coords.y;
      return;
    }
  }

  removal.x = -1;
  removal.y = -1;
});
refreshScreen();

tileButtons = []
for (var i = 0; i < 7; i++) {
    tileButtons.push($("#tile"+i)[0]);
}

tileButtons[0].addEventListener("mousedown", function (evt) { tileClick(0)});
tileButtons[1].addEventListener("mousedown", function (evt) { tileClick(1)});
tileButtons[2].addEventListener("mousedown", function (evt) { tileClick(2)});
tileButtons[3].addEventListener("mousedown", function (evt) { tileClick(3)});
tileButtons[4].addEventListener("mousedown", function (evt) { tileClick(4)});
tileButtons[5].addEventListener("mousedown", function (evt) { tileClick(5)});
tileButtons[6].addEventListener("mousedown", function (evt) { tileClick(6)});

// Selects the approprite tile once clicked
function tileClick(tileNum){
    // Can only select tiles when its the persons turn
    if(turnNum == playerID)
    {
      if(isSwapping) {
        if(swapped.includes(tileNum))
          swapped.splice(swapped.indexOf(tileNum), 1);
        else
          swapped.push(tileNum);

      } else {
        selected = hand[tileNum];
        selectedNum = tileNum;
      }
      renderHand();
    }
}

// Setting up play button
playButton = $("#playButton")[0];
swapButton = $("#swapButton")[0];
challengeButton = $("#challengeButton")[0];
//
function setupGUI()
{
  // Changing tileButton size/positions
  for (var i = 0; i < 7; i++) {
    handX = getAdjstedCoord("x", 725);
    handY = getAdjstedCoord("y", 625);
    tileSizeX = getAdjstedCoord("x", 65);
    tileSizeY = getAdjstedCoord("y", 65);
    margin = getAdjstedCoord("x", 5);

    tileButtons[i].style.left   = (handX+tileSizeX*i + margin*i) + "px";
    tileButtons[i].style.top    = handY + "px";
    tileButtons[i].style.width  = tileSizeX + "px";
    tileButtons[i].style.height = tileSizeY + "px";
  }

  // and the buttons
  playButton.style.top    = getAdjstedCoord("y", 512)+"px";
  playButton.style.left   = getAdjstedCoord("x", 715)+"px";
  playButton.style.width  = getAdjstedCoord("x", 180)+"px";
  playButton.style.height = getAdjstedCoord("y", 80)+"px";

  challengeButton.style.top    = getAdjstedCoord("y", 510)+"px";
  challengeButton.style.left   = getAdjstedCoord("x", 910)+"px";
  challengeButton.style.width  = getAdjstedCoord("x", 90)+"px";
  challengeButton.style.height = getAdjstedCoord("y", 40)+"px";

  swapButton.style.top    = getAdjstedCoord("y", 555)+"px";
  swapButton.style.left   = getAdjstedCoord("x", 915)+"px";
  swapButton.style.width  = getAdjstedCoord("x", 80)+"px";
  swapButton.style.height = getAdjstedCoord("y", 35)+"px";

  if(isSpectating) {
    spectatingLabel.style.top  = getAdjstedCoord("y", 30)+"px";
    spectatingLabel.style.left = getAdjstedCoord("x", 750)+"px";
    spectatingLabel.style.fontSize = "20px"
    spectatingLabel.style.color = "lightgrey"
  }

  for(var i = 0; i < playerScores.length; i++)
  {
    $("#playerLabel"+(i+1))[0].style.top  = getAdjstedCoord("y", 138)+"px";
    $("#playerLabel"+(i+1))[0].style.left = getAdjstedCoord("x", 745+140*i)+"px";
    $("#playerLabel"+(i+1))[0].style.fontSize = "15px"
    $("#playerLabel"+(i+1))[0].style.color = "lightgrey"
    $("#playerLabel"+(i+1)).text("Player "+(i+1));

    $("#scoreText"+(i+1))[0].style.top  = getAdjstedCoord("y", 170)+"px";
    $("#scoreText"+(i+1))[0].style.left = getAdjstedCoord("x", 760+140*i)+"px";
    $("#scoreText"+(i+1))[0].style.fontSize = "25px"
    $("#scoreText"+(i+1))[0].style.color = "lightgrey"
    $("#scoreText"+(i+1)).text(playerScores[i]);

    if(i == turnNum)
      $("#playerLabel"+(i+1))[0].style.color = "cyan"
    if(i == playerID)
    {
      // $("#playerLabel"+(i+1)).text("You");
      $("#playerLabel"+(i+1))[0].style.fontStyle = "italic" 
    }

    $("#timerText")[0].style.top = getAdjstedCoord("y", 490)+"px";
    $("#timerText")[0].style.left = getAdjstedCoord("x", 1100)+"px";
    $("#timerText")[0].style.color = "lightgrey"
    $("#timerText")[0].style.fontSize = "50px"
  }

  $("#charFrequency1").text("A:8 B:2 C:2 D:4 E:12 F:2 G:3 H:2 I:9 J:1 K:1 L:4 M:2");
  $("#charFrequency1")[0].style.top  = getAdjstedCoord("y", 60)+"px";
  $("#charFrequency1")[0].style.left = getAdjstedCoord("x", 730)+"px";
  $("#charFrequency1")[0].style.color = "black"
  $("#charFrequency1")[0].style.fontSize = "15px"
  $("#charFrequency1")[0].style.fontFamily = "courier"
  
  $("#charFrequency2").text("N:6 O:8 P:2 Q:1 R:6 \xa0S:4 T:6 U:4 V:2 W:2 X:1 Y:2 Z:1");
  $("#charFrequency2")[0].style.top  = getAdjstedCoord("y", 80)+"px";
  $("#charFrequency2")[0].style.left = getAdjstedCoord("x", 730)+"px";
  $("#charFrequency2")[0].style.fontSize = "15px"
  $("#charFrequency2")[0].style.color = "black"
  $("#charFrequency2")[0].style.fontFamily = "courier"

}


playButton.addEventListener("mousedown", function (evt) {
    if(isSpectating)
      return;

    if(isSwapping && swapped.length != 0)
    {
      swappedTiles = []
      for(var i = 0; i < swapped.length; i++)
      {
        swappedTiles.push(hand[swapped[i]]);
        hand[swapped[i]] = '';
      }

      msg = {
        tiles: swappedTiles,
        count: swapped.length
      };
      // Exiting out of swapping mode
      swapped = []
      isSwapping = false;
      socket.emit("requestTiles", msg);
    }

    // Updating board with deep copy every time a play is made
    if(!isValidPlay())
    {
      return;
    }

    playerScores[playerID] += score();

    // reseting temp tile locations
    tempTileLocs = [null,null,null,null,null,null,null];


    board = [];
    boardTemp.forEach(element => {
      board.push([...element])
    });
    console.log("Emitting board with (board:"+board+")");
    
    socket.emit("play", {playerScores:playerScores, board:board, placedNum:placedNum})

    socket.emit("requestTiles", {count:placedNum});
    selected = "";
    selectedNum = -1;
    placedNum = 0;
    lastCol = -1;
    lastRow = -1;
    renderBoard()    
});
// -------------------------------------------------------
swapButton.addEventListener("mousedown", function (evt) {   
  getTempTilesFromBoard();

  console.log("Pressed swap button");
  swapped = [];
  isSwapping = !isSwapping
  renderBoard();
});
// GUI functions ----------------------------------------------
function placeImage(imageName, x,y, sizex,sizey)
{
    im = new Image();
    im.src = imageName;
    im.onload = function(){
        ctx.drawImage(im, x, y, sizex, sizey);
    }
}

// Generic Functions ---------------------------------
function setCanvasSize()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
}
// Refreshes screen
function refreshScreen()
{
    setCanvasSize();
    placeImage("img/Background1.png", 0,0,canvas.width, canvas.height)
}
// Gets mouse position in terms of pixels
function getMousePosition(canvas, evt) {
    var box = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - box.left,
        y: evt.clientY - box.top
    };
}
// Gets mouse position in terms of tile placement location on the board
function getMouseGridNum(evt)
{
    pos = getMousePosition(canvas, evt);
    offsetX = getAdjstedCoord("x",43);
    offsetY = getAdjstedCoord("y",43);
    pos.x -= offsetX;
    pos.y -= offsetY;

    tileSizeX = getAdjstedCoord("x",42.3);
    tileSizeY = getAdjstedCoord("y",42.7);
    return {
        x: Math.floor(pos.x/tileSizeX),
        y: Math.floor(pos.y/tileSizeY)
    };
}

function place(coords, tileVal)
{
    if(canPlace(coords))
    {   
        tempTileLocs[selectedNum] = coords;
        boardTemp[coords.y][coords.x] = tileVal;
        
        placedNum++;
        renderBoard()
        hand[selectedNum] = "";
        renderHand();
        selected = "";
        selectedNum = -1;
    }
    else
        console.log("Cannot place tile");
}
function canPlace(coords)
{
    if(gridNum.x < 0 || gridNum.x > 14 || gridNum.y < 0 || gridNum.y > 14)
        return false;

    if(boardTemp[coords.y][coords.x] == "")
    {        
        if( placedNum == 0)
        {
            lastRow = coords.y;
            lastCol = coords.x;
            return true;
        }
        if(placedNum == 1)
        {
            if(coords.y == lastRow)
            {
                isVertical = false;
                return true;
            }
            if(coords.x == lastCol)
            {
                isVertical = true;
                return true;
            }
        }
        if(placedNum > 1)
        {
            if(isVertical && coords.x == lastCol)
                return true;
            if(!isVertical && coords.y == lastRow)
                return true;
        }
    }
    return false;
}

function renderHand()
{
    for (var i = 0; i < 7; i++) {
      if(i == selectedNum && hand[i] != "" || swapped.includes(i))
      {

        tileButtons[i].src = "img/letters_selected/"+hand[i]+".png";
        tileButtons[i].value = hand[i];
      }
      else
      {
        if(hand[i] != "")
        {
            tileButtons[i].src = "img/letters/"+hand[i]+".png";
            tileButtons[i].value = hand[i];
        } else {
            tileButtons[i].src = "img/letters/empty.png";
            tileButtons[i].value = hand[i];
        }
      }
    }
}
function renderBoard()
{
  setupGUI();

  $("#playerLabel").text("You Are Player "+playerID);

  if(isSpectating)
    $("#spectatingLabel").text("You Are Spectating") 

  // Showing score
  st = "Scores: "+playerScores;
  // for (let i = 0; i < playerNum; i++) {
  //   st = st+"   Player"+i+" "+playerScores[i];
  // }

  boardImage = new Image();
  boardImage.src = "img/Background1.png";
  boardImage.onload = function() {
    ctx.drawImage(boardImage,0,0,canvas.width,canvas.height);
    
    offsetX = getAdjstedCoord("x", 43);
    offsetY = getAdjstedCoord("y", 43);
    paddingX = 0;
    paddingY = 0;
    tileSizeX = getAdjstedCoord("x", 42.3);
    tileSizeY = getAdjstedCoord("y", 42.3);
    ysizeMod = getAdjstedCoord("y",0.4);

    if(isSwapping) {
      swapButton.src = "img/swap_selected.png"
    } else {
      swapButton.src = "img/swap.png"
    }

    for(var i = 0; i < 15; i++)
    {
        for(var x = 0; x < 15; x++)
        {
            if(boardTemp[i][x] != '')
            {
                // console.log("placing "+boardTemp);
                
                xCoord = offsetX+tileSizeX*x;
                yCoord = offsetY+tileSizeY*i;
                if(boardTemp[i][x] == board[i][x])
                  ctx.drawImage(tiles[boardTemp[i][x]].img, xCoord, yCoord+ysizeMod*i, tileSizeX,tileSizeY);
                else
                  ctx.drawImage(tiles[boardTemp[i][x]].img_selected, xCoord, yCoord+ysizeMod*i, tileSizeX,tileSizeY);
            }
        }
    }
  }
}

window.addEventListener("resize", function(){
  setCanvasSize();
  renderBoard();
  renderHand();
  setupGUI();
});
// Renders hand initially
renderHand();
renderBoard();