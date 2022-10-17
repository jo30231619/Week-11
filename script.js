//ALL THE COMMENTS BELOW WILL BE SPECIFIC TO MY CODE THAT I WILL USE TO CONSTRUCT THIS GAME.
//The variable winCombos represents an array that includes all the possible index variations that will determine the winner. 
//The cells variable is going to store a reference to each cell. This query selector is going to select each element on the page that has the class of cell which is all these td elements.
//We are going to have to call a function to start the game, which is just gonna be the start game function.
//This is a way to make the array be every number from 0 to 9. It is going to create an array of 9 elements. It is going to be just the keys for that element which is 0 through 9 and its going to create an array.
//Throughout the game, we are going to putting x's and o's, at the end of the game, we want to restart and clear the board.
//This for loop is a reference to every cell and it is going to loop through every cell.
//cells<i> is going to be each item of the cell when it loops through this for loop. 
//This is going to add an eventlistener on the click event and we are gong to call the turnClick function, so now everytime that somebody clicks one of these squares, we are going to call the turn click function.
//This is going to log the ID of whatever square was clicked,Inside the turnclick function, we are going to click the turn function. We are going to pass in the ID that were clicking and then we are going to passin the player, because its the player that is doing the turn.this function works if the player clicks, so the players have to be in this function.
//The turn function is going to take 2 parameters, the squareid and the player, We are going to set the board array at the ID that we clicked to player. So on this array, its going to show the player who just took a turn in that spot.
//But we actually dont see that array, we are also going to gave to update the display so we can see where you clicked. So we are going to select the elements that was just clicked, and set the inner text to equal player.
//whenever a turn has been taken, we are going to check if the game has been won. We are going to pass in 2 things, the original board array which is an array that shows everything on the board where the x's and o's are, and the player, the current player because we want to check if the current player has just won.
//If we find that the game has been won call the game over function with the gamewon variable.
//This is a way to find all the places on the board that have already been played in. The reduce method is going to go through every element of the board array and do something and its going to give back one single value, the accumulator
//is the value thats going to give back at the end. and we are going to initalize the accumulator to an empty array. The e is the element in the board array that were going through and the I is the index, so if the element equals the player. Then this is a ternary operator, so then we are going to just concat i, 
//that just means that we are going to take the accumulator array and we are going to add the index to that array and then if he does not equal player, we are just going to return the accumulator just as it was so we are not going to add anything to the acumulator, 
//So this is just a way to find every index that the player has played in. Then we are going to check if the game has been won with a for loop.
//So we are going to need the index and the win for this for of loop. this is what the .entries method means. So win.every means we are going to go through every element in the win, 
//So every element in the wincombinations, we are going to check Plays.index of elem is more than negative 1.
//Plays is all the places that the player has played on the board and index of so we are going to see if the index of the element is more than -1. this means has the player played in every spot that counts as a win for that win so has the player playing all these spots, and then its a loop, has the player played in any of these spots?
//We go through every single one to see if the players play in all the spots that constitutes a win combo, if so that means the player has won, 
//so we are going to set gameWOn to equal index and player to equal and player, So now we know which winCombo the player has won. The index of the array of wincombos, and the player that won.
//Then we are going to break from the function

var origBoard;
const player1 = 'O';
const player2 = 'X';
var currentPlayer = player1;
const myModal = document.getElementById('myModal');
const myInput = document.getElementById('myInput');
const winCombos = [
    [0,1,2],
    [3,4,5,],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    origBoard = Array.from(Array(9).keys());
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].addEventListener('click', turnClick, false);
        document.getElementById('alertId').classList.add('hide');
        document.getElementById('alert2Id').classList.add('hide');
        document.getElementById('alert3Id').classList.add('hide');
    }
}

function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {
        turn(square.target.id, currentPlayer);
        if (currentPlayer === player1) {
            currentPlayer = player2;
            alert("X's turn")
        } else {
            currentPlayer = player1;
            alert("O's turn")
        }
        if (!checkTie()) turn(player2);
    }
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
      (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index)
        gameWon.player == player1 ? document.getElementById('alertId').classList.remove('hide') : document.getElementById('alert2Id').classList.remove('hide');
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false)
    }
}

function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}


function checkTie() {
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            document.getElementById('alert3Id').classList.remove('hide');
            cells[i].removeEventListener('click', turnClick, false);
        }
        return true;
    }
    return false;
}



