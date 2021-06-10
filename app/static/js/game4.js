// Team xoxo :: Stella Oh, Constance Chen, Winnie Huang, Helena Williams
// SoftDev
// P3: ArRESTed Development, JuSt in Time
// 2021-04-21

//retrieve node in DOM via ID
var c = document.getElementById("slate");
var playB = document.getElementById("playButton");
var guessB = document.getElementById("guessButton");

//instantiate a CanvasRenderingContext2D object
var ctx = c.getContext("2d");

//words
const words = ['hello', 'love', 'happy'];
var word = words[Math.floor(Math.random() * words.length)];
var userGuesses = 6;
const wordLen = word.length;
var splitWord = word.split('');
const alphabet = "abcdefghijklmnopqrstuvwxyz";
var wordGuess = '';

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

  var printBlankWord = (word) => {
    // print blanks for current word
    console.log(word);
  
    ctx.font = "80px serif";
    blanks = '';
    for (let i = 0; i < splitWord.length; i++) {
      blanks += "_ ";  
    }
    var startPoint = 10 + 600/(splitWord.length);
    ctx.fillText(blanks, startPoint, 400);
  }
  printBlankWord(word);
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

var fillWord = (word, guessLetter = '') => {
  // add correctly guessed letter to blanks
  let blankWord = printBlankWord(word);
  if (guessLetter()) {
    // if letter is correct, fill in blanks
    word.split('').forEach(function(letter) {
      if (!letter === guessLetter) {
        letter = letter.replace('_');
      }
    });
  }
  word = word.join('');
  printWord(word);
  return word;
}

var wonGame = () => {
  ctx.font = '50px serif';
  ctx.fillText("You Won!");
}    

var lostGame = () => {
  ctx.font = '50px serif';
  ctx.fillText("Game Over!");
}

var playGame = () => {
  // starts game and plays through to end
  setUp();
  var getLetter = () => {
    //getting input value
    var guessLetter = document.getElementById("letter").value;
    console.log(guessLetter);
    if (word.includes(guessLetter)) {
      //printing the corresponding letter in word on canvas
      userGuesses--;
    }
    else {
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
    }
    console.log(userGuesses);
  }
  guessB.addEventListener("click", getLetter);
}

playB.addEventListener("click", playGame);

