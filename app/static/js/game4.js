// Team xoxo :: Stella Oh, Constance Chen, Winnie Huang, Helena Williams
// SoftDev
// P3: ArRESTed Development, JuSt in Time
// 2021-04-21

//retrieve node in DOM via ID
var c = document.getElementById("slate");
var playB = document.getElementById("playButton");
var submit = document.getElementById('submitL');

//instantiate a CanvasRenderingContext2D object
var ctx = c.getContext("2d");

//words
const words = ['hello', 'love', 'happy'];
var word = words[Math.floor(Math.random() * words.length)];

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
}

var head = () => {
  //draw the head
  ctx.beginPath();
  ctx.arc(350,210,15,0,2*Math.PI);
  ctx.stroke();
}

var upperTorso = () => {
  //draw the upper torso
  ctx.beginPath();
  ctx.moveTo(350,225);
  ctx.lineTo(350,250);
  ctx.stroke();
}

var lowerTorso = () => {
  //draw the lower torso
  ctx.beginPath();
  ctx.moveTo(350,250);
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

var printBlankWord = (word) => {
  // print blanks for current word
  console.log(word);

  ctx.font = "80px serif";
  splitWord = word.split('');
  blanks = '';
  for (let i = 0; i < splitWord.length; i++) {
    blanks += "_ ";  
  }
  var startPoint = 10 + 600/(splitWord.length);
  ctx.fillText(blanks, startPoint, 400);
}

var addToHangman = () => {
  // add new element to hangman 
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
  // checks if word is complete
  return (word.length === fillWord());
  }    

var lostGame = (playHangman) => {
  // checks whether playHangman equal to completedHangman
  return playHangman === completedHangman;
}

var playGame = () => {
  // starts game and plays through to end
  setUp();
  printBlankWord(word);
  
  var guessLetter = (word) => {
    // allows user to guess letter and returns true or false based on current word 
    var letter = document.getElementById('inputLetter').value;
    console.log(letter);
    console.log(word.includes(letter));
  }

  submit.addEventListener("click", guessLetter(word));
}

playB.addEventListener("click", playGame);

