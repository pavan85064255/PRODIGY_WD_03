const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // columns
  [0,4,8], [2,4,6]            // diagonals
];

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (boardState[clickedIndex] !== "" || !isGameActive) {
    return; // ignore if cell filled or game ended
  }

  updateCell(clickedCell, clickedIndex);
  checkResult();
}

function updateCell(cell, index) {
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function checkResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      boardState[a] !== "" &&
      boardState[a] === boardState[b] &&
      boardState[b] === boardState[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDiv.textContent = `Player ${currentPlayer} wins! 🎉`;
    isGameActive = false;
    return;
  }

  if (!boardState.includes("")) {
    statusDiv.textContent = `It's a draw! 🤝`;
    isGameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");
}

// Initialize status message
statusDiv.textContent = `Player ${currentPlayer}'s turn`;

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
