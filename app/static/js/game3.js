// Team xoxo :: Stella Oh, Constance Chen, Winnie Huang, Helena Williams
// SoftDev
// P3: ArRESTed Development, JuSt in Time
// 2021-04-21
// model for HTML5 canvas-based js animation

// SKEELTON


//access canvas and buttons via DOM
var c = document.getElementById("slate"); // GET CANVAS
var dotButton = document.getElementById("buttonGame"); // GET DOT BUTTON
var stopButton = document.getElementById("buttonStop"); // GET STOP BUTTON

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d"); // YOUR CODE HERE

var requestID;  //init global var for use with animation frames

document.getElementById("points").innerHTML = points;

//var clear = function(e) {
var backdrop = (e) => {
  //console.log("clear invoked...")
  ctx.fillStyle = "#87CEEB"
  ctx.fillRect(0,0,600,500);

  ctx.fillStyle = "#7cfc00";
  ctx.fillRect(0,500,600,100);
};

var radius = 20;

var xpos1 = Math.random()*600;
var ypos1 = 520;
var popped1 = false;

var xpos2 = Math.random()*600;
var ypos2 = 520;
var popped2 = false;

var xpos3 = Math.random()*600;
var ypos3 = 520;
var popped3 = false;

var timer = 0;
var points = 0;

//stage setup
ctx.fillStyle = "#87CEEB";
ctx.fillRect(0,0,600,600);

ctx.fillStyle = "#7cfc00";
ctx.fillRect(0,500,600,100);

var drawDot = () => {
    timer++;
    //Wipe the canvas
    //console.log("drawDot invoked...");

    backdrop();
    console.log(timer);
    if(timer < 1000){
      console.log("IMMA DOIN OKAIIIII");
      //Repaint the balloon
      ctx.beginPath();
      b1 = ctx.arc(xpos1, ypos1, radius, 0, 2 * Math.PI);

      if(popped1 == false){
        ctx.fillStyle = "#ff0700";
      } else {
        ctx.fillStyle = "#87CEEB";
      };
      ctx.fill();
      //ctx.addHitRegion({id: "balloon1"});

      ctx.fillStyle = "#7cfc00";
      ctx.fillRect(0,500,600,100);

      if(timer > 100){
        if(timer > 200){
          ctx.beginPath();
          ctx.arc(xpos3, ypos3, radius, 0, 2 * Math.PI);

          if(popped3 == false){
            ctx.fillStyle = "#ff0700";
          } else {
            ctx.fillStyle = "#87CEEB";
          };
          ctx.fill();
          //ctx.addHitRegion({id: "balloon2"});

          ctx.fillStyle = "#7cfc00";
          ctx.fillRect(0,500,600,100);


          ypos3-=2;
          if(ypos3 < -20){
            xpos3 = Math.random()*600;
            ypos3 = 520;
            popped3 = false;
          }
        }
        ctx.beginPath();
        ctx.arc(xpos2, ypos2, radius, 0, 2 * Math.PI);

        if(popped2 == false){
          ctx.fillStyle = "#ff0700";
        } else {
          ctx.fillStyle = "#87CEEB";
        };
        ctx.fill();
        //ctx.addHitRegion({id: "balloon2"});

        ctx.fillStyle = "#7cfc00";
        ctx.fillRect(0,500,600,100);


        ypos2-=2;
        if(ypos2 < -20){
          xpos2 = Math.random()*600;
          ypos2 = 520;
          popped2 = false;
        }
      }

      window.cancelAnimationFrame(requestID);
      ypos1-=2;
      if(ypos1 < -20){
        xpos1 = Math.random()*600;
        ypos1 = 520;
        popped1 = false;
      }
      requestID = window.requestAnimationFrame(drawDot);
};

function gmp(event, coord){
  var bounds = c.getBoundingClientRect();
  if(coord == "x"){
    var mouseX = event.clientX - bounds.left;
    return mouseX;
  } else {
    var mouseY = event.clientY - bounds.top;
    return mouseY;
  }

}
var pop = () => {
  var mouseX = gmp(event, "x");
  var mouseY = gmp(event, "y");
  //console.log(mouseX);
  //console.log(mouseY);
  if(hitboxCheck(xpos1, ypos1, mouseX, mouseY)){
    popped1 = true;
  };
  if(hitboxCheck(xpos2, ypos2, mouseX, mouseY)){
    popped2 = true;
  };
  if(hitboxCheck(xpos3, ypos3, mouseX, mouseY)){
    popped3 = true;
  };
};

var runGame = () => {
  drawDot();
};

var hitboxCheck = function(bx, by, mx, my){
  if(mx > (bx - 20) && mx < (bx + 20)){
    //console.log("BY:");
    //console.log(by);
    //console.log(my);
    if(my > (by - 20) && my < (by + 20)){
      console.log("OI'VE BIN POPPED.");
      points++;
      console.log("Points: "+points);
      return(true);
    };
  };
};

dotButton.addEventListener( "click", drawDot );
c.addEventListener( "click", pop );
