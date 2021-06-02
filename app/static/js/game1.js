// Team xoxo :: Stella Oh, Constance Chen, Winnie Huang, Helena Williams
// SoftDev
// P3: ArRESTed Development, JuSt in Time
// 2021-04-21

//retrieve node in DOM via ID
var c = document.getElementById("slate");

//instantiate a CanvasRenderingContext2D object
var ctx = c.getContext("2d");

//set fill color to team color
ctx.fillStyle = "#D2E8EE";

//init global state var
var mode = "setting";
var points = 0;

var color = [
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

var playerColor = [
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

// Box width
var bw = 400;
// Box height
var bh = 400;

// draws grid
function drawBoard(){
    for (var x = 0; x <= bw; x += 100) {
        ctx.moveTo(1 + x, 0);
        ctx.lineTo(0.5 + x, bh);
    }

    for (var x = 0; x <= bh; x += 100) {
        ctx.moveTo(0, 0.5 + x);
        ctx.lineTo(bw, 0.5 + x);
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
}
    
//clears canvas
var clearCanvas = function () {
    if (mode == "setting"){
        console.log("clearing...");
        ctx.clearRect(0,0,c.width,c.height);
        mode = "playing";
        drawBoard();
    }
}

// creates a random pattern on the board
var randomize = function () {
    if (mode == "setting"){
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                color[i][j] = Math.floor(Math.random() * 2);
            }
        }   
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (color[i][j] == 1){ 
                    ctx.fillRect(i * 100, j * 100, 100, 100); 
                } 
            }
        }
    drawBoard();
    }
}

// allows player to press on boxes in the grid
var play = (e) =>  {
    if (mode == "playing"){
        x = event.offsetX; // finds the x coordinate based on distance from border
        y = event.offsetY; // finds the y coordinate based on distance from border

        x = Math.floor(x/100);
        y = Math.floor(y/100);

        playerColor [x][y] = 1;

        ctx.fillRect(x * 100, y * 100, 100, 100); 
        drawBoard();
    }
}

// assesses players guess
var assess = function () {
    if (mode == "playing"){
        mode = "assessing";
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (color[i][j] != playerColor[i][j]){
                    mode = "gamerOver";

                    ctx.fillStyle = "#E27575";
                    ctx.fillRect(0, 0, 400, 400);

                    break;
                    
                }
                color[i][j] = 0;
                playerColor[i][j] = 0;
            }
        }
        if (mode == "assessing"){
            points++;
            console.log(points);
            mode = "setting";
            clearCanvas();
            mode = "setting";
            randomize();
        }
    }
}

randomize();

//event listeners
c.addEventListener("mousedown", play);
document.getElementById("clear").addEventListener("click", clearCanvas);
document.getElementById("done").addEventListener("click", assess);
