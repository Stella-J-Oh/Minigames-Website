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
const words = ['hello', 'love', 'happy', 'zing', 'zest', 'brain', 'thinker', 'trouble', 'star', 'pride'];
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

var reset = () => {
  location.reload();
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
  ctx.clearRect(0,0,c.width, c.height);
  ctx.fillStyle = "#7d8597";
  ctx.fillRect(0, 0, 600, 600);
  ctx.fillStyle = "black";
  ctx.font = "25px serif";
  ctx.fillText('Game Over', 250, 300);
}

var lostGame = () => {
  ctx.clearRect(0,0,c.width, c.height);
  ctx.fillStyle = "#7d8597";
  ctx.fillRect(0, 0, 600, 600);
  ctx.fillStyle = "black";
  ctx.font = "25px serif";
  ctx.fillText('Game Over', 250, 300); 
  ctx.fillText("The correct word was... " + word, 175, 330)
}

var getLetter = () => {
  //getting input value
  var guessLetter = document.getElementById("letter").value;
  console.log(guessLetter);
  return guessLetter;
}

var compareArr = () => {
  for (var i = 0; i < userWord.length; i++) {
     if (userWord[i] != splitWord[i]) {
       return false;
     }
  }
  return true;
}

var playGame = () => {
  daLetter = getLetter();
  document.getElementById("letter").value = '';
  console.log(userGuesses);
  ctx.clearRect(480, 0, 520, 100);
  ctx.fillStyle = "black";
  ctx.font = '50px serif';
  ctx.fillText(userGuesses, 500, 50);
  if(word.includes(daLetter)){
    if (userWord.indexOf(daLetter) != -1) {
      message.textContent = "Oops! Looks like you already guessed this.";
    }
    for(var k = 0; k < splitWord.length; k++){
      console.log("bouta print");
      ctx.fillStyle = "white";
      ctx.clearRect(0, 353, 600, 100);
      ctx.fillRect(0, 350, 600, 100);
      ctx.font = "50px serif";
      ctx.fillStyle = "black";

      if (daLetter.localeCompare(splitWord[k]) == 0) {
        userWord[k] = daLetter;
        console.log("add to word");
      }
      var fucc = userWord.join("  ");
      ctx.font = "50px serif";
      ctx.fillText(fucc, startPos, 400);
      console.log("printed");
    }
  }
  
  else {
    if (incorrectLetters.indexOf(daLetter) != -1) {
      message.textContent = "Oops! Looks like you already guessed this.";
      userGuesses++;
    }
    else {
      message.textContent = "";
      incorrectLetters.push(daLetter);
      var incorrect = incorrectLetters.join(", ");
      ctx.font = "30px serif";
      ctx.fillText(incorrect, 150, 500);
    }
    userGuesses--;
  }

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
  
  if (compareArr()) {
    wonGame();
  } 
}

playB.addEventListener("click", setUp);
guessB.addEventListener("click", playGame);
restart.addEventListener("click", reset)