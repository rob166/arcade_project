let playerOneName = document.getElementById('player_one');
let playerTwoName = document.getElementById('player_two');
let playerOneDisplay = document.getElementById('player_one_name_display');
let playerTwoDisplay = document.getElementById('player_two_name_display');
let buttonPlayerOne = document.getElementById('submit_player_one');
let buttonPlayerTwo = document.getElementById('submit_player_two');
let gameProgress = document.querySelector('.game_progress');
let tableBoard = document.getElementById('board');
let playerOnePoints = document.getElementById('player_one_points');
let playerTwoPoints = document.getElementById('player_two_points');
let buttonNewGame = document.getElementById('reset');
let dataCell = document.getElementsByClassName('data_cell_class');

let playerXCount = 0;
let playerOCount = 0;
let playerTurn = 'X';
let gameArray = ['', '', '', '', '', '', '', '', ''];


buttonPlayerOne.addEventListener('click', function() {
  playerOneDisplay.innerHTML = `${playerOneName.value}, you will play as 'X' and go first`
  playerOneName.value = "";
  buttonPlayerOne.disabled = true;
  return;
}
);

buttonPlayerTwo.addEventListener('click', function() {
  playerTwoDisplay.innerHTML = `${playerTwoName.value}, you will play as 'O' and go second`
  playerTwoName.value = "";
  buttonPlayerTwo.disabled = true;
  return;
}
);

gameProgress.innerHTML = `it is ${playerTurn}'s turn`;

tableBoard.addEventListener('click', clickDataCell);

let filledArray = [];

function clickDataCell (event) {
  let targetIdValue = event.target.id;

  
  if (gameArray[targetIdValue] !=='') {
    return;

  } else {
    gameArray[targetIdValue] = playerTurn;
    
   
    event.target.innerHTML = playerTurn;

    filledArray += gameArray[targetIdValue];
    
    if (filledArray.length >=9) {
      gameProgress.innerHTML = `IT IS A DRAW!  No points, try again!`;
      setTimeout(newGame, 1000);
      return ;
    };
  
    if (checkIfWon()) {

      gameProgress.innerHTML = `${playerTurn} HAS WON!  You get a point!`;
      
      setTimeout(newGame, 1000);

      if (playerTurn == 'X') {
        playerXCount = ++playerXCount
        playerOnePoints.innerHTML = `${playerTurn} has ${playerXCount} points`;
        return;

      } else {
        playerOCount = ++playerOCount
        playerTwoPoints.innerHTML = `${playerTurn} has ${playerOCount} points`;
        return;
      };
    
    };
    
  };
switchPlayer();
return;
};

function newGame() {
  for (i = 0; i<= 8; ++i){
    dataCell[i].innerHTML = '';
  };

  gameArray = ['', '', '', '', '', '', '', '', ''];
  playerTurn = 'X';
  gameProgress.innerHTML = `it is ${playerTurn}'s turn`;
  filledArray = [];
  return;
};

buttonNewGame.addEventListener('click', newGame);
   
function checkIfWon() {
  if (gameArray[0] === playerTurn) {
    if (gameArray[1] === playerTurn && gameArray[2] === playerTurn) {
      return true;
    }
    if (gameArray[3] === playerTurn && gameArray[6] === playerTurn) {
    return true;
    }
    if (gameArray[4] === playerTurn && gameArray[8] === playerTurn) {
    return true;
    }
  }

  if (gameArray[2] === playerTurn) {
    if (gameArray[5] === playerTurn && gameArray[8] === playerTurn) {
    return true;
    }
    if (gameArray[4] === playerTurn && gameArray[6] === playerTurn) {
    return true;
    }
  }

  if (gameArray[4] === playerTurn) {
    if (gameArray[3] === playerTurn && gameArray[5] === playerTurn) {
    return true;
    }
    if (gameArray[1] === playerTurn && gameArray[7] === playerTurn) {
    return true;
    }
  }

  if (gameArray[6] === playerTurn) {
    if (gameArray[7] === playerTurn && gameArray[8] === playerTurn) {
    return true;
    }
  }

};

function switchPlayer(){
  playerTurn = playerTurn === 'X' ? 'O' : 'X';
  gameProgress.innerHTML = `it is ${playerTurn}'s turn`;
  return;

};


