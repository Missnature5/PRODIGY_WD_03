const cells = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('.reset-btn');
const status = document.getElementById('status');
const winner = document.getElementById('winner');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let moves = 0;

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (board[index] === '' && moves < 9) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    moves++;

    if (checkForWin(board, currentPlayer)) {
      status.textContent = `Player ${currentPlayer} wins!`;
      winner.textContent = `Winner: Player ${currentPlayer}`;
    } else if (moves === 9) {
      status.textContent = 'It\'s a draw!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkForWin(board, player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }

  return false;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  moves = 0;
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
  });
  status.textContent = `Player X's turn`;
  winner.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
resetGame();