// Team xoxo :: Stella Oh, Constance Chen, Winnie Huang, Helena Williams
// SoftDev
// P3: ArRESTed Development, JuSt in Time
// 2021-04-21

//retrieve node in DOM via ID
var c = document.getElementById("slate");
var playB = document.getElementById("playButton");
var guessB = document.getElementById("guessButton");
var restart = document.getElementById("restart");
var message = document.getElementById("error");

//instantiate a CanvasRenderingContext2D object
var ctx = c.getContext("2d");

//words
const words = ['hello', 'love', 'happy'];
var word = ""; 
var userGuesses = 0;
var splitWord = []; 
var userWord = [];
var incorrectLetters = [];
var startPos = -1;

console.log(userWord);

var setUp = () => {
  // draw the structure
  ctx.beginPath();
  ctx.moveTo(250,300);
  ctx.lineTo(250,100);
  ctx.lineTo(350,100);
  ctx.lineTo(350,195);
  ctx.stroke();

  // incorrect letters box
  ctx.font = "25px serif";
  ctx.fillText('Incorrect letters:', 200, 470);

  userGuesses = 6;
  word = words[Math.floor(Math.random() * words.length)];
  splitWord = word.split('');

  var printBlankWord = (word) => {
    // print blanks for current word
    console.log(word);

    ctx.font = "80px serif";
    for (let i = 0; i < splitWord.length; i++) {
      userWord.push("_ ");
    }
    startPos = 600/(splitWord.length) - 10;
    var blanks = userWord.join("")
    ctx.fillText(blanks, startPos, 400);
  }
  printBlankWord(word);
}

var reStart = () => {
  context.clearRect(0,0,c.width, c.height);
  setUp();
}

var head = () => {
  //draw the head
  ctx.beginPath();
  ctx.arc(350,210,15,0,2*Math.PI);
  ctx.stroke();
}

var torso = () => {
  //draw the upper torso
  ctx.beginPath();
  ctx.moveTo(350,225);
  ctx.lineTo(350,270);
  ctx.stroke();
}

var arm1 = () => {
  //draw first arm
  ctx.beginPath();
  ctx.moveTo(350,230);
  ctx.lineTo(340,250);
  ctx.stroke();
}

var arm2 = () => {
  //draw second arm
  ctx.beginPath();
  ctx.moveTo(350,230);
  ctx.lineTo(360,250);
  ctx.stroke();
}

var leg1 = () => {
  //draw first leg
  ctx.beginPath();
  ctx.moveTo(350,270);
  ctx.lineTo(340,300);
  ctx.stroke();
}

var leg2 = () => {
  //draw second leg
  ctx.beginPath();
  ctx.moveTo(350,270);
  ctx.lineTo(360,300);
  ctx.stroke();
}

var wonGame = () => {
  ctx.font = '50px serif';
  ctx.fillText("You Won!", 100, 300);
}

var lostGame = () => {
  ctx.font = '50px serif';
  ctx.fillText("Game Over!", 150, 300);
}

var getLetter = () => {
  //getting input value
  var guessLetter = document.getElementById("letter").value;
  console.log(guessLetter);
  return guessLetter;
}

var playGame = () => {
  daLetter = getLetter();
  document.getElementById("letter").value = '';
  if(word.includes(daLetter)){
    for(var k = 0; k < splitWord.length; k++){
      ctx.fillStyle = "white";
      ctx.clearRect(0, 353, 600, 100);
      ctx.fillRect(0, 350, 600, 100);
      ctx.font = "50px serif";
      ctx.fillStyle = "black";
      if(daLetter.localeCompare(splitWord[k]) == 0 ) {
        userWord[k] = daLetter;
      }
      var fucc = userWord.join("  ");
      ctx.font = "50px serif";
      ctx.fillText(fucc, startPos, 400);
    }
    console.log(userWord);
    userGuesses--;
  }
  else {
    if (incorrectLetters.indexOf(daLetter) != -1) {
      message.textContent = "Oops! Looks like you already guessed this."
    }
    else {
      message.textContent = "";
      incorrectLetters.push(daLetter);
      var incorrect = incorrectLetters.join(", ");
      ctx.font = "30px serif";
      ctx.fillText(incorrect, 150, 500);
    }

    userGuesses--;
    if (userGuesses == 5) {
      head();
    }
    else if (userGuesses == 4) {
      torso();
    }
    else if (userGuesses == 3) {
      leg1();
    }
    else if (userGuesses == 2) {
      leg2();
    }
    else if (userGuesses == 1) {
      arm1();
    }
    else if (userGuesses == 0) {
      arm2();
      lostGame();
    }
    console.log(userGuesses);
  }
}

playB.addEventListener("click", setUp);
guessB.addEventListener("click", playGame);
restart.addEventListener("click", setUp);