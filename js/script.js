// Basic variable setup ----------------------------
turnNum = 0
playerNum = 0;
var selected = "";
var selectedNum = -1;

// Setting up canvas
var canvas = document.querySelector("canvas");
setCanvasSize()
var ctx = canvas.getContext("2d");
refreshScreen();
// ---
tileButtons = []
for (var i = 0; i < 7; i++) {
    tileButtons.push(document.getElementById("tile"+i));

    // Changing button size/positions
    handX = 725
    handY = 625
    tileSize = 65
    margin = 5;
    tileButtons[i].style.left = (handX+tileSize*i + margin*i) + "px";
    tileButtons[i].style.top = handY + "px";
    tileButtons[i].style.width = tileSize + "px";
    tileButtons[i].style.height = tileSize + "px";
}

tileButtons[0].addEventListener("mousedown", function (evt) {
    tileClick(0)
});
tileButtons[1].addEventListener("mousedown", function (evt) {
    tileClick(1)
});
tileButtons[2].addEventListener("mousedown", function (evt) {
    tileClick(2)
});
tileButtons[3].addEventListener("mousedown", function (evt) {
    tileClick(3)
});
tileButtons[4].addEventListener("mousedown", function (evt) {
    tileClick(4)
});
tileButtons[5].addEventListener("mousedown", function (evt) {
    tileClick(5)
});
tileButtons[6].addEventListener("mousedown", function (evt) {
    tileClick(6)
});


function tileClick(tileNum)
{
    selected = hand[tileNum]
    selectedNum = tileNum
    console.log(selected)
}

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
    'blank', 'blank'
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
    Z: 10
};
var tiles = {};
var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z', "blank"];
for(var i = 0; i < 27; i++){
    tiles[letters[i]] = {
        val: tilePoints[letters[i]],
        img: new Image()
    };
    tiles[letters[i]].img.src = "img/letters/"+letters[i]+".png";
    tiles[letters[i]].img.onload = function(){
        console.log("loaded "+letters[i]);
    }
}

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
// -----------------------------------------

function draw()
{
    // drawing tiles to fill hand
    for(var i = 0; i < hand.length; i++)
    {
        if(hand[i] == '')
            hand[i] = pullTile()
        if(!hand[i])
            hand[i] = ""
    }

    renderHand();
}

function renderHand()
{
    for (var i = 0; i < 7; i++) {
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
function renderBoard()
{
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
            if(board[i][x] != '')
            {
                xCoord = offsetX+tileSize*x;
                yCoord = offsetY+tileSize*i;
                ctx.drawImage(tiles[board[i][x]].img, xCoord, yCoord+ysizeMod*i, tileSize,tileSize+ysizeMod);
            }
        }
    }
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

function placeText(text, fontSize, x,y)
{
    ctx.font = fontSize+"px Arial";
    ctx.fillText(text, x, y);
}

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
function refreshScreen()
{
    setCanvasSize();
    placeImage("img/EmptyBoard.png", 0,0,canvas.width, canvas.height)
}
function getMousePosition(canvas, evt) {
    var box = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - box.left,
        y: evt.clientY - box.top
    };
}
canvas.addEventListener("mousedown", function (evt) {

    if(selected != "")
    {
        pos = getMousePosition(canvas, evt)
        offset = 43
        pos.x -= offset
        pos.y -= offset

        tileSize = 42.3;
        ysizeMod = 0.4;

        coords = {
            x: Math.floor(pos.x/tileSize),
            y: Math.floor(pos.y/tileSize)
        }
        board[coords.y][coords.x] = selected;
        renderBoard()
        hand[selectedNum] = "";
        draw();
        selected = "";
        selectedNum = -1;
    }
});
renderHand();
// draw();
// ---------------------------------------------------
