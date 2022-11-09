// Variable declarations from HTML

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

// Initialze counter variables for each player to track scores

let playerXCount = 0;
let playerOCount = 0;

// Initialize variable to track which player's turn it is

let playerTurn = 'X';

// Initialize the array to keep track of which data cells are selected

let gameArray = ['', '', '', '', '', '', '', '', ''];

//Initialize an array to determine if the game ends in a draw

let filledArray = [];

// Show which player's turn it is

gameProgress.innerHTML = `it is ${playerTurn}'s turn`;

// Helper Functions

// Function to switch between players for each turn
// Uses a ternanry operator instead of 'if-else' statements

function switchPlayer(){
  playerTurn = playerTurn === 'X' ? 'O' : 'X';
  gameProgress.innerHTML = `it is ${playerTurn}'s turn`;
  return;
};

// Function to reset the board

function newGame() {
  
// Iterate through all 9 data cells to reset each to empty

  for (i = 0; i<= 8; ++i){
    dataCell[i].innerHTML = '';
  };

// Reset the array used to keep track of which data cells have been selected

  gameArray = ['', '', '', '', '', '', '', '', ''];

// Reset 'X' to start the game  

  playerTurn = 'X';
  gameProgress.innerHTML = `it is ${playerTurn}'s turn`;

 // Reset the array used to check for a draw

  filledArray = [];
  return;
};

// Function to check if a player has won
// Looks to see if the current player's turn has completed one of 
// the winning combinations of row, column, or diagonal data cells

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

// Main function to determine game play when a data cell is clicked

function clickDataCell (event) {
  let targetIdValue = event.target.id;

// Deterine if data cell already has been selected (not empty), if not 
// claim it for the current player

  if (gameArray[targetIdValue] !=='') {
    return;

  } else {
    gameArray[targetIdValue] = playerTurn;
    
// Add the curent player's symbol to the data cell

    event.target.innerHTML = playerTurn;

// Add the claimed data cell to the array used to determine a draw    

    filledArray += gameArray[targetIdValue];

// If the draw array contains 9 values, the game ends in a draw
// Wait one second and reset the board    
    
    if (filledArray.length >=9) {
      gameProgress.innerHTML = `IT IS A DRAW!  No points, try again!`;
      setTimeout(newGame, 1000);
      return ;
    };

// Check the clicked cell to see if it completes a winning game
// and announce that to the players if true

    if (checkIfWon()) {

      gameProgress.innerHTML = `${playerTurn} HAS WON!  You get a point!`;

// Wait one second before resetting the game board to continue play      
      
      setTimeout(newGame, 1000);

// Add a point to the winning player's total after the  board reset to 
// maintain the score cumulatively      

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

// Switch the players after evaluating each move for win or draw
// to continue play

switchPlayer();
return;
};

// Event Listeners

// Listener for data cell activation

tableBoard.addEventListener('click', clickDataCell);

// Listener for adding Player One's name to screen and assign to 'X'

buttonPlayerOne.addEventListener('click', function() {
  playerOneDisplay.innerHTML = `${playerOneName.value}, you will play as 'X' and go first`
  
// Clear input box after entering name and disable button

  playerOneName.value = "";
  buttonPlayerOne.disabled = true;
  return;
}
);

// Listener for adding Player Two's name to screen and assign to 'O'

buttonPlayerTwo.addEventListener('click', function() {
  playerTwoDisplay.innerHTML = `${playerTwoName.value}, you will play as 'O' and go second`
  playerTwoName.value = "";
  buttonPlayerTwo.disabled = true;
  return;
}
);

// Listener to reset the board

buttonNewGame.addEventListener('click', newGame);

