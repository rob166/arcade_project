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

let drawArray = [];

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
// for X or O, and remove color class aplied to winning combinations

  for (i = 0; i<= 8; ++i){
    dataCell[i].innerHTML = '';
    dataCell[i].classList.remove('win_cell_color');
  };

// Reset the array used to keep track of which data cells have been selected

  gameArray = ['', '', '', '', '', '', '', '', ''];

// Let other player start the next game  

  switchPlayer(); 

// Turn back on the event listeners that were turned off if a game
// was a draw or win  

  tableBoard.addEventListener('click', clickDataCell);
  buttonNewGame.addEventListener('click', newGame);

// Reset the array used to check for a draw
 
  drawArray = [];
  return;
};

// Function to check if a player has won
// Looks to see if the current player's turn has completed one of 
// the winning combinations of row, column, or diagonal data cells
// Adds color to the cells in the winning combination

function checkIfWon() {
  if (gameArray[0] === playerTurn) {
    if (gameArray[1] === playerTurn && gameArray[2] === playerTurn) {
      dataCell[0].classList.add('win_cell_color');
      dataCell[1].classList.add('win_cell_color');
      dataCell[2].classList.add('win_cell_color');
      return true;
    }
    if (gameArray[3] === playerTurn && gameArray[6] === playerTurn) {
      dataCell[0].classList.add('win_cell_color');
      dataCell[3].classList.add('win_cell_color');
      dataCell[6].classList.add('win_cell_color');
      return true;
    }
    if (gameArray[4] === playerTurn && gameArray[8] === playerTurn) {
      dataCell[0].classList.add('win_cell_color');
      dataCell[4].classList.add('win_cell_color');
      dataCell[8].classList.add('win_cell_color');
      return true;
    }
  }

  if (gameArray[2] === playerTurn) {
    if (gameArray[5] === playerTurn && gameArray[8] === playerTurn) {
      dataCell[2].classList.add('win_cell_color');
      dataCell[5].classList.add('win_cell_color');
      dataCell[8].classList.add('win_cell_color');
      return true;
    }
    if (gameArray[4] === playerTurn && gameArray[6] === playerTurn) {
      dataCell[2].classList.add('win_cell_color');
      dataCell[4].classList.add('win_cell_color');
      dataCell[6].classList.add('win_cell_color');
      return true;
    }
  }

  if (gameArray[4] === playerTurn) {
    if (gameArray[3] === playerTurn && gameArray[5] === playerTurn) {
      dataCell[4].classList.add('win_cell_color');
      dataCell[3].classList.add('win_cell_color');
      dataCell[5].classList.add('win_cell_color');
      return true;
    }
    if (gameArray[1] === playerTurn && gameArray[7] === playerTurn) {
      dataCell[4].classList.add('win_cell_color');
      dataCell[1].classList.add('win_cell_color');
      dataCell[7].classList.add('win_cell_color');
      return true;
    }
  }

  if (gameArray[6] === playerTurn) {
    if (gameArray[7] === playerTurn && gameArray[8] === playerTurn) {
      dataCell[6].classList.add('win_cell_color');
      dataCell[7].classList.add('win_cell_color');
      dataCell[8].classList.add('win_cell_color');
      return true;
    }
  }
};

// Main function to determine game play when a data cell is clicked

function clickDataCell (event) {
  let targetIdValue = event.target.id;

// Deterine if data cell already has been selected (i.e. not empty), if not 
// claim it for the current player

  if (gameArray[targetIdValue] !=='') {
    return;

  } else {
    gameArray[targetIdValue] = playerTurn;
    
// Add the curent player's symbol to the data cell

    event.target.innerHTML = playerTurn;

// Add the claimed data cell to the array used to determine a draw    

    drawArray += gameArray[targetIdValue];

// If the draw array contains 9 values, the game ends in a draw
// Wait some time and reset the board, turning off the reset board
// listener so the correct player's turn is set after the waiting period
    
    if (drawArray.length >= 9) {

      gameProgress.innerHTML = `IT IS A DRAW!  No points, try again!`;
      buttonNewGame.removeEventListener('click', newGame);
      setTimeout(newGame, 4000);
      return ;
    };

// Check the clicked cell to see if it completes a winning game
// and announce that to the players if true

    if (checkIfWon()) {

      gameProgress.innerHTML = `${playerTurn} HAS WON!  You get a point!`;

// Wait some time before resetting the game board to continue play, turning
// off the data cell event listener so nothing else is registered during the 
// waiting period, and the reset board listener so the correct player's turn
// is set after the waiting period

      tableBoard.removeEventListener('click', clickDataCell);
      buttonNewGame.removeEventListener('click', newGame);

      setTimeout(newGame, 4000);

// Add a point to the winning player's total 
    
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
  playerOneDisplay.innerHTML = `${playerOneName.value}, you will play as 'X'`
  
// Clear input box after entering name and disable button

  playerOneName.value = "";
  buttonPlayerOne.disabled = true;
  return;
}
);

// Listener for adding Player Two's name to screen and assign to 'O'

buttonPlayerTwo.addEventListener('click', function() {
  playerTwoDisplay.innerHTML = `${playerTwoName.value}, you will play as 'O'`
  playerTwoName.value = "";
  buttonPlayerTwo.disabled = true;
  return;
}
);

// Listener to reset the board

buttonNewGame.addEventListener('click', newGame);

