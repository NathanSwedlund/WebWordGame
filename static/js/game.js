// TODO:
//  Add validate play function that runs on playbutton mousedown. 
//  Add tempTileLocs array to help with this.
//  
//  Create score play function
// 
//  implement multiplayer

//  Setting Up Major game variables -----------------------------------------
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
  Z: 10
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
turnNum = 0
playerNum = 0;
var selected = "";
var selectedNum = -1;
var lastCol = -1
var lastRow = -1
var isVertical;
var placedNum = 0;
var removal = { x: -1, y:-1};
// --------------------------------------------------------

// Setting up board board GUI ------------------
//Setting up canvas
var canvas = $("canvas")[0];
console.log(canvas);

setCanvasSize()
var ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", function (evt) {
  // Removing already placed tile
  if(removal.x != -1 && removal.y != -1)
  {
    placedNum--;
    temp = boardTemp[removal.y][removal.x];
    boardTemp[removal.y][removal.x] = '';
    for (let i = 0; i < hand.length; i++) {
      if(hand[i] == '')
      {
        hand[i] = temp;
        renderHand();
        renderBoard();
        return;
      }
    }
  }
  if(selected != "")
  {   
      gridNum = getMouseGridNum(evt);
      place(gridNum, selected);
  }
});
canvas.addEventListener("mousemove", function (evt) {
  coords = getMouseGridNum(evt);
  // If mouse is over board
  if(coords.x <= 14 && coords.y <= 14 && coords.x >= 0 && coords.y >= 0)
  {
    console.log("over board");
    
    // If it is hovering over a tile this person placed but has not yet played...
    if(board[coords.y][coords.x] != boardTemp[coords.y][coords.x])
    {
      console.log("your tile");
      removal.x = coords.x;
      removal.y = coords.y;
      console.log("move ",removal)
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

// Selects the approprite tile once clicked
function tileClick(tileNum){
    selected = hand[tileNum];
    selectedNum = tileNum;
    renderHand();
}

// Setting up play button
playButton = document.getElementById("playButton");
playButton.style.top = "515px"
playButton.style.left = "750px";
playButton.style.width = "168px";
playButton.style.height = "70px";
playButton.addEventListener("mousedown", function (evt) {
    // Updating board with deep copy every time a play is made
    board = [];
    boardTemp.forEach(element => {
      board.push([...element])
    });

    draw();
    selected = "";
    selectedNum = -1;
    placedNum = 0;
    lastCol = -1;
    lastRow = -1;
    turnNum = (turnNum+1)%playerNum;
    renderBoard()    
});
// -------------------------------------------------------

// GUI functions ----------------------------------------------
function placeImage(imageName, x,y, sizex,sizey)
{
    console.log("Placing: ", imageName);
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
    console.log({v:isVertical, lc:lastCol, lr:lastRow});
    if(canPlace(coords))
    {   
        console.log("placing");
        console.log("board[0][0]", board[0][0]);

        boardTemp[coords.y][coords.x] = tileVal;
        console.log("board[0][0]", board[0][0]);

        lastRow = coords.y;
        lastCol = coords.x;

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
    {
        console.log("Tile out of range")
        return false;
    }

    if(boardTemp[coords.y][coords.x] == "")
    {
        console.log("Loc is empty");
        
        if( placedNum == 0)
        {
            console.log("placedNum == 0");
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
renderHand();