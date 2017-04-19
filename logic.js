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


////////////////////////////////////////////////////////////////////

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

    if (this.innerHTML == that.checkNum && this.innerHTML < 26) {

      this.parentNode.classList.add("cellRight");
      this.parentNode.classList.remove("cell");
      this.textContent = that.arrShuffle[that.checkNum + 24];
      that.nextNumOne.textContent = that.chekNum;

      that.checkNum ++; // adds one

      console.log(that.checkNum); //Shows the number to click in console
      that.nextNumOne.textContent = that.checkNum;
      that.nextNumTwo.textContent = that.checkNum + 1;

    }  else if (this.innerHTML == that.checkNum && this.innerHTML > 25) {

        this.parentNode.classList.add("cellDone");
        this.parentNode.classList.remove("cellRight");

        if (that.checkNum === 50) {

          clearInterval(that.decimasTimer);
        }

        that.checkNum ++; // adds one

        console.log(that.checkNum); //Shows the number to click in console

        if (that.checkNum < 50) {

          that.nextNumOne.textContent = that.checkNum;
          that.nextNumTwo.textContent = that.checkNum + 1;
        }

        if (that.checkNum === 50) {

          that.nextNumOne.textContent = that.checkNum;
          that.nextNumTwo.textContent = "";
        }

        if (that.checkNum === 51) {

          that.nextNumOne.textContent = "";
        }

      }

    });
  }
};

//----------------------Countdown----------------------
Game.prototype.countdown = function() {

  // this.infoP.style.visibility = "hidden";
  this.infoP.remove();

  var that = this;

  var countToStart = setInterval(function () {

        if (that.count > 0){

          that.countdownNum[0].textContent = that.count;

          that.count --;

        } else if (that.count === 0) {

          that.countdownNum[0].textContent = "go!";

          that.count --;

        }  else if (that.count === -1) {
          document.querySelector(".info").style.visibility = "hidden"; //remove();
          clearInterval(countToStart);
        }
      }, 1000)
  }


//-----------------------timer-----------------------------
Game.prototype.timer = function() {

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

  this.arrShuffle.length = 0;
  this.count = 3;

  this.checkNum = 1;

  this.decimas = 0;
  this.seconds = 0;
  this.minutes = 0;
  clearInterval(that.decimasTimer);

  this.decimasText.textContent = this.decimas;
  this.secondsText.textContent = this.seconds + ":";
  this.minutesText.textContent = this.minutes + ":";

  this.nextNumOne.textContent = "";
  this.nextNumTwo.textContent = "";

  for(var i = 0; i < this.cellNumber.length; i++){
    this.cellNumber[i].textContent = "";
  };

  that.countdownNum[0].textContent = "";

  document.querySelector(".info").style.visibility = "visible";
  $(".info").prepend($("<p>Press Start and count until 50 as fast as you can!</p>").addClass("infoP"));

  // console.log("nextNum reset" + this.nextNumOne);

}

//-------------------Reset HTML---------------------------

Game.prototype.resetHTML = function() {

  //document.querySelector(".info").style.visibility = "visible";

}


//-------------------Reset Game----------------------

Game.prototype.resetGame = function() {

this.resetGlobalValues();

// game.resetGlobalValues();

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

        that.isOn = !that.isOn;
        console.log("isOn now is " + that.isOn)

      } else if (that.isOn === true){ //without this works, check game.resetGame()

        this.classList.add("startButton");
        this.classList.remove("resetButton");
        this.textContent = "Start";

        that.isOn = !that.isOn;
        console.log("isOn now is " + that.isOn)


        game.resetGame();

        //console.log("arrInOrder " + that.arrInOrder);
        console.log("arrShuffle " + that.arrShuffle);
        console.log("count " + that.count);
        console.log("checkNum " + that.checkNum);
        console.log("decimas " + that.decimas + " seconds " + that.seconds + " minutes " + that.minutes);





      }


    });
  };

  game.startGame();
});
