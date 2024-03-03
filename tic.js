document.addEventListener('DOMContentLoaded', init);

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function init() {
    createBoard();
}

function createBoard() {
    const boardElement = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

function handleCellClick(event) {
    const clickedCellIndex = event.target.getAttribute('data-index');
    if (gameBoard[clickedCellIndex] === '' && gameActive) {
        gameBoard[clickedCellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            displayResult(`${currentPlayer} wins!`);
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            displayResult('It\'s a tie!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
    });
}

function displayResult(result) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = result;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });

    const resultElement = document.getElementById('result');
    resultElement.textContent = '';
}
