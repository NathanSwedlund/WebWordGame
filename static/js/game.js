// TODO:
//  Add validate play function that runs on playbutton mousedown.  DONE
//  Add tempTileLocs array to help with this. DONE
//  
//  Create score play function DONE
// 
//  implement multiplayer WOKRING ON IT

//  Setting Up Major game variables -----------------------------------------

var socket = io();

tempTileLocs = [null,null,null,null,null,null,null];
var tileBag = [
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

socket.on("updateVars", function (msg) {
  boardTemp = msg.board;
  board = [];
  boardTemp.forEach(element => {
    board.push([...element])
  });
  console.log("board", board);
  
  console.log(msg);  
  turnNum = msg.turnNum;
  if(playerID == -1)
    playerID = msg.playerNum;
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
scoreText = $("#scoreText")[0];
scoreLabel = $("#scoreLabel")[0];
playerLabel= $("#playerLabel")[0];
var canvas = $("canvas")[0];

setCanvasSize()
var ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", function (evt) {
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
          if(boardTemp[y-1][x] && boardTemp[y-1][x] != '')
            double = true
          if(boardTemp[y+1][x] && boardTemp[y+1][x] != '')
            double = true
        }
      if(placedNum == 1)
      {
        hasHorizontal = false;
        hasVertical = false;
        if(boardTemp[y-1][x] && boardTemp[y-1][x] != '')
          hasVertical = true        
        if(boardTemp[y+1][x] && boardTemp[y+1][x] != '')
          hasVertical = true        
        if(boardTemp[y][x-1] && boardTemp[y][x-1] != '')
          hasHorizontal = true;
        if(boardTemp[y][x+1] && boardTemp[y][x+1] != '')
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
    // Changing button size/positions
    handX = 725
    handY = 625
    tileSize = 65
    margin = 5;
    tileButtons[i].style.left   = (handX+tileSize*i + margin*i) + "px";
    tileButtons[i].style.top    = handY + "px";
    tileButtons[i].style.width  = tileSize + "px";
    tileButtons[i].style.height = tileSize + "px";
}

tileButtons[0].addEventListener("mousedown", function (evt) { tileClick(0)});
tileButtons[1].addEventListener("mousedown", function (evt) { tileClick(1)});
tileButtons[2].addEventListener("mousedown", function (evt) { tileClick(2)});
tileButtons[3].addEventListener("mousedown", function (evt) { tileClick(3)});
tileButtons[4].addEventListener("mousedown", function (evt) { tileClick(4)});
tileButtons[5].addEventListener("mousedown", function (evt) { tileClick(5)});
tileButtons[6].addEventListener("mousedown", function (evt) { tileClick(6)});

// canvas.addEventListener("mouseup", function (evt) {
//   console.log("up");
// });

// Selects the approprite tile once clicked
function tileClick(tileNum){
    // Can only select tiles when its the persons turn
    if(turnNum == playerID)
    {
      selected = hand[tileNum];
      selectedNum = tileNum;
      renderHand();
    }
}

// Setting up play button
playButton = document.getElementById("playButton");
playButton.style.top = "515px"
playButton.style.left = "750px";
playButton.style.width = "168px";
playButton.style.height = "70px";
playButton.addEventListener("mousedown", function (evt) {
    // Updating board with deep copy every time a play is made
    if(!isValidPlay())
    {
      return;
    }


    playerScores[playerID] += score();

          // --- TEMPORARY ---
    // playerID = (playerID+1)%playerNum;
          // --- TEMPORARY ---

    // reseting temp tile locations
    tempTileLocs = [null,null,null,null,null,null,null];

    board = [];
    boardTemp.forEach(element => {
      board.push([...element])
    });
    console.log("Emitting board with (board:"+board+")");
    
    socket.emit("play", {playerScores:playerScores, board:board})

    draw();
    selected = "";
    selectedNum = -1;
    placedNum = 0;
    lastCol = -1;
    lastRow = -1;
    renderBoard()    
});
// -------------------------------------------------------

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
}
// Refreshes screen
function refreshScreen()
{
    setCanvasSize();
    placeImage("img/EmptyBoard.png", 0,0,canvas.width, canvas.height)
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
    pos = getMousePosition(canvas, evt)
    offset = 43
    pos.x -= offset
    pos.y -= offset

    tileSize = 42.3;
    ysizeMod = 0.4;

    return {
        x: Math.floor(pos.x/tileSize),
        y: Math.floor(pos.y/tileSize)
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
      if(i == selectedNum && hand[i] != "")
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
  scoreText.style.top    = "80px";
  scoreText.style.left   = "800px";
  scoreLabel.style.top   = "80px";
  scoreLabel.style.left  = "700px";
  playerLabel.style.top  = "30px"
  playerLabel.style.left = "750px"
  $("#playerLabel").text("You are player "+playerID);
  $("#scoreText").text(playerScores);

  boardImage = new Image();
  boardImage.src = "img/EmptyBoard.png";
  boardImage.onload = function() {
    ctx.drawImage(boardImage,0,0,canvas.width,canvas.height);
    offsetX = 43;
    offsetY = 43;
    paddingX = 0;
    paddingY = 0;
    tileSize = 42.3;
    ysizeMod = 0.4;
    for(var i = 0; i < 15; i++)
    {
        for(var x = 0; x < 15; x++)
        {
            if(boardTemp[i][x] != '')
            {
                // console.log("placing "+boardTemp);
                
                xCoord = offsetX+tileSize*x;
                yCoord = offsetY+tileSize*i;
                if(boardTemp[i][x] == board[i][x])
                  ctx.drawImage(tiles[boardTemp[i][x]].img, xCoord, yCoord+ysizeMod*i, tileSize,tileSize+ysizeMod);
                else
                  ctx.drawImage(tiles[boardTemp[i][x]].img_selected, xCoord, yCoord+ysizeMod*i, tileSize,tileSize+ysizeMod);
            }
        }
    }
  }
}


// Game based functions -----------------------------------
function draw() {
  // drawing tiles to fill hand
  for(var i = 0; i < hand.length; i++) {
      if(hand[i] == '')
          hand[i] = pullTile()
      if(!hand[i])
          hand[i] = ""
  }
  renderHand();
}

function pullTile()
{
  var tile = tileBag[Math.floor(Math.random()* tileBag.length)];
  const ind = tileBag.indexOf(tile);
  if (ind != -1) {
      tileBag.splice(ind, 1);
  }
  return tile;
}
//----------------------------------------------------------------------

// Renders hand initially
draw();
renderHand();
renderBoard();