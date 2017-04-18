function Game(num){
  this.rows = num;
  this.col = num;
  this.checkNum = 1;
  this.arrInOrder = new Array(); //Array to store the numbers
  this.arrShuffle = new Array(); //Array Shuffled
  this.count = 3;
  this.decimasTimer;
  this.isOn = false;
  //this.numbers = numbers;
  //array goes here

  for (var rowIndex = 0; rowIndex < this.rows ; rowIndex++) {
    for (var colIndex = 0; colIndex < this.col; colIndex++) {
    $(".gridContainer").append($("<div>")
    .addClass("cell")
    //.attr("data-row", rowIndex)
    //.attr("data-column", colIndex)
    .append($("<p>")
    .addClass("cellNumber")));

  this.cellNumber = document.querySelectorAll(".cellNumber");
  this.cell = document.querySelectorAll(".cell");

    }
  }
}


//----------Create Array In Order from 1 to 25------------------
Game.prototype.createArrInOrder = function() {

  for(var i = 0; i < 25; i++) {
    this.arrInOrder.push(i + 1);
  }
};

//Pick random index numbers from arrInOrder and store it--------------
//in arrShuffle (ArrInOrder ends empty)

Game.prototype.createArrShuffle = function() {

  for(var i = 0; i < 25; i++){
    var randomIndex = Math.floor(Math.random() * (this.arrInOrder.length));
    this.arrShuffle.push(this.arrInOrder[randomIndex]);
    this.arrInOrder.splice(randomIndex, 1);
  }
};

//-----Create the last 25 ordered numbers of the arrShuffle-------------
Game.prototype.createLast25 = function() {

  for(var i = 26; i < 51; i++) {
    this.arrShuffle.push(i);
  }
};

//Display numbers in the cell grid
Game.prototype.displayNums = function() {

  for(var i = 0; i < this.cellNumber.length; i++){
    this.cellNumber[i].textContent = this.arrShuffle[i];
  };
};

///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

//-------------------Click number actions---------------------------
Game.prototype.clickNumber = function() {
//var showNum = 1;
var self = this;

var nextNumOne = document.querySelector("#nextNumOne");
var nextNumTwo = document.querySelector("#nextNumTwo");

nextNumOne.textContent = "1";
nextNumTwo.textContent = "2";

for(var i = 0; i < this.cell.length; i++) {
  this.cellNumber[i].addEventListener("click", function() {

    this.innerHTML = Number(this.innerHTML);

    //still to improve the else part
    if (this.innerHTML == self.checkNum && this.innerHTML < 26) {

      this.parentNode.classList.add("cellRight");
      this.parentNode.classList.remove("cell");
      this.textContent = self.arrShuffle[self.checkNum + 24];
      nextNumOne.textContent = self.chekNum;
      self.checkNum ++;
      console.log(self.checkNum);
      nextNumOne.textContent = self.checkNum;
      nextNumTwo.textContent = self.checkNum + 1;
        //$('.cellNumber').append('<p>' + game.checkNum + '</p>')
    }  else if (this.innerHTML == self.checkNum && this.innerHTML > 25) {
        this.parentNode.classList.add("cellDone");
        this.parentNode.classList.remove("cellRight");

        if (self.checkNum === 50) {
          console.log("pop");
          clearInterval(self.decimasTimer);
        }

        self.checkNum ++;
        console.log(self.checkNum);

        if (self.checkNum < 50) {
          nextNumOne.textContent = self.checkNum;
          nextNumTwo.textContent = self.checkNum + 1;
        }

        if (self.checkNum === 50) {
          nextNumOne.textContent = self.checkNum;
          console.log("Box 2 Empty");
          nextNumTwo.textContent = "";
        }

        if (self.checkNum === 51) {
          console.log("textNumOne Empty");
          nextNumOne.textContent = "";
        }

      }

    });
  }
};

//----------------------Countdown----------------------
Game.prototype.countdown = function() {

  var message = document.querySelector("#info p").remove();
  //message.innerHTML = "";
  var countdownNum = document.querySelector("#countdownNum")
  //var count = 3;

  var self = this;

  var countToStart = setInterval(function () {

        if (self.count > 0){
          countdownNum.textContent = self.count;

          console.log(self.count);
          self.count --;
        } else if (self.count === 0) {
          countdownNum.textContent = "go!";
          self.count --;
        }  else if (self.count === -1) {
          document.querySelector("#info").remove();
          clearInterval(countToStart);
        }
      }, 1000)
  }


//-----------------------timer-----------------------------
Game.prototype.timer = function() {

  var minutesText = document.querySelector("#minutes");
  var secondsText = document.querySelector("#seconds");
  var decimasText = document.querySelector("#decimas");

  var decimas = 0;
  var seconds = 0;
  var minutes = 0;



this.decimasTimer = setInterval(function() {

  if (decimas < 10) {
    decimasText.textContent = decimas;
    secondsText.textContent = seconds + ":";
    minutesText.textContent = minutes + ":";

    decimas ++;
    if (decimas === 10) {
      decimas = 0;
      seconds++;
    }
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        }
        // if (this.checkNum === 51) { //doesn't work!!
        //
        // }
          if (minutes === 1) {
            // decimas = 0;
            // seconds = 0;
            // minutes = 0;
            clearInterval(this.decimasTimer);
          }
  }
}, 100)

}


//-------------Initial onOffButton Color-------------

//-------------------Reset Game----------------------

// Game.prototype.resetGame = function() {
//
// }


//-------------------------------------------------
//--------------Game Execution---------------------
//-------------------------------------------------

$(document).ready(function() {

  var game = new Game(5);

//----Start Button actions-----



  Game.prototype.startGame = function() {

    var onOffButton = document.querySelector("#onOffButton");
    onOffButton.classList.add("startButton");
    onOffButton.textContent = "Start";
    var buttonAround = document.querySelector(".buttonAround")

    var that = this;
    onOffButton.addEventListener("click", function() {

      if (that.isOn === false) {
        console.log(game.checkNum);
        game.countdown();
        setTimeout(function() { game.timer(); }, 5000);
        game.createArrInOrder();
        game.createArrShuffle();
        game.createLast25();
        game.displayNums();
        game.clickNumber();
        this.classList.add("resetButton");
        this.classList.remove("startButton");
        this.style.visibility = "hidden";
        buttonAround.style.visibility = "hidden";
        this.textContent = "Reset";
        setTimeout(function(){
          console.log("pop");
          this.onOffButton.style.visibility = "visible";
          buttonAround.style.visibility = "visible";
        }, 5000);
        this.isOn = !this.isOn;
      }
      // else if (that.isOn === true){
      //
      //
      //   that.isOn = !that.isOn;
      //   game.startGame();
      // }




    });
  };

  game.startGame();

});
