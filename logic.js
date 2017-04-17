function Game(num){
  this.rows = num;
  this.col = num;
  this.checkNum = 1;
  this.arrInOrder = new Array(); //Array to store the numbers
  this.arrShuffle = new Array(); //Array Shuffled
  this.count = 3;
  //this.numbers = numbers;
  //array goes here

  for (var rowIndex = 0; rowIndex < this.rows ; rowIndex++) {
    for (var colIndex = 0; colIndex < this.col; colIndex++) {
    $(".gridContainer").append($("<div>")
    .addClass("cell")
    .attr("data-row", rowIndex)
    .attr("data-column", colIndex)
    .append($("<p>")
    .addClass("cellNumber")));

  this.cellNumber = document.querySelectorAll(".cellNumber");
  this.cell = document.querySelectorAll(".cell");

    }
  }
}


// Create Array In Order from 1 to 25
Game.prototype.createArrInOrder = function() {

  for(var i = 0; i < 25; i++) {
    this.arrInOrder.push(i + 1);
  }
};

//Pick random index numbers from arrInOrder and store it
//in arrShuffle (ArrInOrder ends empty)

Game.prototype.createArrShuffle = function() {

  for(var i = 0; i < 25; i++){
    var randomIndex = Math.floor(Math.random() * (this.arrInOrder.length));
    this.arrShuffle.push(this.arrInOrder[randomIndex]);
    this.arrInOrder.splice(randomIndex, 1);
  }
};

//Create the last 25 ordered numbers of the arrShuffle
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

//--------------Click number actions---------------
Game.prototype.clickNumber = function() {
//var showNum = 1;
var self = this;

var nextNum = document.querySelector(".nextNum");

for(var i = 0; i < this.cell.length; i++) {
  this.cellNumber[i].addEventListener("click", function() {

    this.innerHTML = Number(this.innerHTML);

    //still to improve the else part
    if (this.innerHTML == self.checkNum && this.innerHTML < 26) {

      this.parentNode.classList.add("cellRight");
      this.parentNode.classList.remove("cell");
      this.textContent = self.arrShuffle[self.checkNum + 24];
      nextNum.textContent = self.chekNum;
      self.checkNum ++;
      console.log(self.checkNum);
    } else {
        this.parentNode.classList.add("cellDone");
        this.parentNode.classList.remove("cellRight");
        }


  });
}
};

//-------------Countdown----------------------
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

  //---------------Show Next Number-----------------------
  // Game.prototype.nextNum = function() {
  //
  //   var nextNum = document.querySelector(".nextNum");
  //   if (this.checkNum < 51) {
  //     nextNum.textContent = this.checkNum;
  //   }
  // };


//--------------------timer-----------------------------
Game.prototype.timer = function() {

  var minutesText = document.querySelector("#minutes");
  var secondsText = document.querySelector("#seconds");
  var decimasText = document.querySelector("#decimas");

  var decimas = 0;
  var seconds = 0;
  var minutes = 0;

var decimasTimer = setInterval(function() {

  if (decimas < 10) {
    decimasText.textContent = decimas;
    secondsText.textContent = seconds + ":";

    decimas ++;
    if (decimas === 10) {
      decimas = 0;
      seconds++;
    }
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        }
        if (this.checkNum === 51) { //doesn't work!!
          console.log("poop");
          clearInterval(decimasTimer);
        }
          if (minutes === 2) {
            decimas = 0;
            seconds = 0;
            minutes = 0;
            clearInterval(decimasTimer);
          }
  }
}, 100)

}


//-------------------------------------------------
//--------------Game Execution---------------------

$(document).ready(function() {

  var game = new Game(5);

//Start Button actions
  Game.prototype.startGame = function() {

    var startButton = document.querySelector("#startButton");


    startButton.addEventListener("click", function() {

      game.countdown();
      setTimeout(function() { game.timer(); }, 5000);
      game.createArrInOrder();
      game.createArrShuffle();
      game.createLast25();
      game.displayNums();
      game.clickNumber();
    });
  };

  game.startGame();

});
