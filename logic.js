function Game(num){
  this.rows = num;
  this.col = num;
  this.checkNum = 1;
  this.arrInOrder = new Array(); //Array to store the numbers
  this.arrShuffle = new Array(); //Array Shuffled
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

//Pick random index numbers from arrInOrder and store it in arrShuffle (ArrInOrder ends empty)
Game.prototype.createArrShuffle = function() {

  for(var i = 0; i < 25; i++){
    var randomIndex = Math.floor(Math.random()* (this.arrInOrder.length));
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
  }
};

///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

// Click number actions
Game.prototype.clickNumber = function() {

var self = this;

for(var i = 0; i < this.cell.length; i++) {
  this.cellNumber[i].addEventListener("click", function() {

    //conditional
    if (this.innerHTML == self.checkNum) {

      //this.parentNode.classList.add("cellRight");
      //this.parentNode.classList.remove("cell");
      this.textContent = self.arrShuffle[self.checkNum + 24];
      self.checkNum ++;
      console.log(self.checkNum);
      }
  });
}
};

Game.prototype.countdown = function() {

  var message = document.querySelector("#info");
  message.innerHTML = "";

    var countdownNum = document.querySelector("#countdownNum")

    var count = 3;

      setInterval(function () {

        if (count > 0){
          countdownNum.textContent = count;

          console.log(count);
          count --
        }
      }, 1000)
  }





/////////////////////////////////////

/////////////////////////////////////



$(document).ready(function() {

  var game = new Game(5);

//Start Button actions
  Game.prototype.startGame = function() {

    var startButton = document.querySelector("#startButton");

    startButton.addEventListener("click", function() {

      game.countdown();
      game.createArrInOrder();
      game.createArrShuffle();
      game.createLast25();
      game.displayNums();
      game.clickNumber();
    });
  };

  game.startGame();

});
