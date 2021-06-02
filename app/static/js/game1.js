// Team xoxo :: Stella Oh, Constance Chen, Winnie Huang, Helena Williams
// SoftDev
// P3: ArRESTed Development, JuSt in Time
// 2021-04-21

var canvas = document.getElementById("slate");
var ctx = canvas.getContext("2d");
var clearB = document.getElementById("clearButton");

// Box width
var bw = 600;
// Box height
var bh = 600;
// Padding
var p = 0;

// clear function
var clear = () => {
    console.log("clear invoked...");
    ctx.clearRect(0, 0, c.width, c.height); // clears the canvas
};

function drawBoard(){
    for (var x = 0; x <= bw; x += 40) {
        ctx.moveTo(0.5 + x + p, p);
        ctx.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += 40) {
        ctx.moveTo(p, 0.5 + x + p);
        ctx.lineTo(bw + p, 0.5 + x + p);
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
    console.log ("yay");
}

drawBoard();

clearB.addEventListener("click", clear());



