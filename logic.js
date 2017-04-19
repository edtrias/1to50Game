function Game(num){
  this.rows = num;
  this.col = num;
  this.checkNum = 1;
  this.arrInOrder = new Array(); //Array to store the numbers
  this.arrShuffle = new Array(); //Array Shuffled
  this.count = 3;
  this.decimasTimer;
  this.isOn = false;
  this.decimas = 0; //Not checked
  this.seconds = 0;
  this.minutes = 0;

  $(".gridContainer").append($("<div>").addClass("info"));
  $(".info").append($("<p>Press Start and count until 50 as fast as you can!</p>").addClass("infoP"));
  $(".info").append($("<p></p>").addClass("countdownNum"));
  this.infoP = $(".infoP");
  this.countdownNum = $(".countdownNum");

  for (var rowIndex = 0; rowIndex < this.rows ; rowIndex++) {
    for (var colIndex = 0; colIndex < this.col; colIndex++) {
    $(".gridContainer").append($("<div>")
    .addClass("cell")
    .append($("<p>")
    .addClass("cellNumber")));


    }
  }

  this.cellNumber = document.querySelectorAll(".cellNumber");
  this.cell = document.querySelectorAll(".cell");

  this.minutesText = document.querySelector("#minutes"); //Not checked
  this.secondsText = document.querySelector("#seconds");
  this.decimasText = document.querySelector("#decimas");

  this.nextNumOne = document.querySelector("#nextNumOne");
  this.nextNumTwo = document.querySelector("#nextNumTwo");

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
var that = this;

// var nextNumOne = document.querySelector("#nextNumOne");
// var nextNumTwo = document.querySelector("#nextNumTwo");

that.nextNumOne.textContent = "1";
that.nextNumTwo.textContent = "2";

for(var i = 0; i < this.cell.length; i++) {
  this.cellNumber[i].addEventListener("click", function() {

    this.innerHTML = Number(this.innerHTML);

    //still to improve the else part
    if (this.innerHTML == that.checkNum && this.innerHTML < 26) {

      this.parentNode.classList.add("cellRight");
      this.parentNode.classList.remove("cell");
      this.textContent = that.arrShuffle[that.checkNum + 24];
      that.nextNumOne.textContent = that.chekNum;
      that.checkNum ++;
      console.log(that.checkNum);
      that.nextNumOne.textContent = that.checkNum;
      that.nextNumTwo.textContent = that.checkNum + 1;
        //$('.cellNumber').append('<p>' + game.checkNum + '</p>')
    }  else if (this.innerHTML == that.checkNum && this.innerHTML > 25) {
        this.parentNode.classList.add("cellDone");
        this.parentNode.classList.remove("cellRight");

        if (that.checkNum === 50) {
          //console.log("pop");
          clearInterval(that.decimasTimer);
        }

        that.checkNum ++;
        console.log(that.checkNum);

        if (that.checkNum < 50) {
          that.nextNumOne.textContent = that.checkNum;
          that.nextNumTwo.textContent = that.checkNum + 1;
        }

        if (that.checkNum === 50) {
          that.nextNumOne.textContent = that.checkNum;
          //console.log("Box 2 Empty");
          that.nextNumTwo.textContent = "";
        }

        if (that.checkNum === 51) {
          //console.log("textNumOne Empty");
          that.nextNumOne.textContent = "";
        }

      }

    });
  }
};

//----------------------Countdown----------------------
Game.prototype.countdown = function() {

  //var messageToEdit = this.message;
  this.infoP.remove();
  //var countdownNum = document.querySelector(".countdownNum")[0];

  var that = this;

  var countToStart = setInterval(function () {

        if (that.count > 0){
          //$(".countdownNum").html(that.count);
          that.countdownNum[0].textContent = that.count;
          //console.log(that.countdownNum.innerHTML);
          //console.log(that.countdownNum);
          that.count --;
        } else if (that.count === 0) {
          that.countdownNum[0].textContent = "go!";
          //console.log(that.countdownNum.textContent);
          that.count --;
        }  else if (that.count === -1) {
          document.querySelector(".info").style.visibility = "hidden"; //remove();
          clearInterval(countToStart);
        }
      }, 1000)
  }


//-----------------------timer-----------------------------
Game.prototype.timer = function() {

  // var minutesText = document.querySelector("#minutes");
  // var secondsText = document.querySelector("#seconds");
  // var decimasText = document.querySelector("#decimas");

  // var decimas = 0;
  // var seconds = 0;
  // var minutes = 0;

  var that = this;

this.decimasTimer = setInterval(function() {

  if (that.decimas < 10) {
    that.decimasText.textContent = that.decimas;
    that.secondsText.textContent = that.seconds + ":";
    that.minutesText.textContent = that.minutes + ":";

    that.decimas ++;
    if (that.decimas === 10) {
      that.decimas = 0;
      that.seconds++;
    }
      if (that.seconds === 60) {
        that.seconds = 0;
        that.minutes++;
        }
        // if (this.checkNum === 51) { //doesn't work!!
        //
        // }
          if (that.minutes === 5) {
            // decimas = 0;
            // seconds = 0;
            // minutes = 0;
            clearInterval(that.decimasTimer);
          }
  }
}, 100)

}


//-------------------Reset Global values-------------------

Game.prototype.resetGlobalValues = function() {

  var that = this;

  this.arrInOrder = [];
  this.arrShuffle = [];

  this.count = 3;

  this.checkNum = 1;

  clearInterval(that.decimasTimer);
  this.decimas = 0;
  this.seconds = 0;
  this.minutes = 0;

  this.nextNumOne = "";
  this.nextNumTwo = "";

  console.log("nextNum reset" + this.nextNumOne);

}

//-------------------Reset HTML---------------------------

Game.prototype.resetHTML = function() {

  document.querySelector(".info").style.visibility = "visible";

}


//-------------------Reset Game----------------------

Game.prototype.resetGame = function() {

  game.resetGlobalValues()


  // console.log(this.checkNum);
  // console.log(this.count);
  //var message = document.querySelector("#info p").style.visibility = "visible";
  //$(".gridContainer").append($("<div>").addClass("info")); //try


}


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
        //console.log(game.checkNum);
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
          //console.log("pop");
          this.onOffButton.style.visibility = "visible";
          buttonAround.style.visibility = "visible";
        }, 5000);
        this.isOn = !this.isOn;
      } else if (that.isOn === true){ //without this works, check game.resetGame()

          game.resetGame();


        that.isOn = !that.isOn;

      }


    });
  };

  game.startGame();
});
