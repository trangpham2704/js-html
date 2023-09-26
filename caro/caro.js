const dimensionButton = document.getElementById('dimension-button');

const dimensionElement = document.getElementById('dimension');

const statusElement = document.getElementById('status');

const restartButton = document.getElementById('restart-btn');

const singlePlayerToggle = document.getElementById('single-player-toggle');

const boardElement = document.getElementById('board');

let dimension = 10; 

dimensionButton.textContent = `${dimension}x${dimension}`;

let singlePlayerMode = false;
let squares = Array(dimension).fill(Array(dimension).fill(null));

let xIsNext = Math.random() < 0.5; 

let theWinner = null;
let winningLine = [];


const dimensions = [10, 12, 16, 20];
let dimensionIndex = 0; 

dimensionButton.addEventListener('click', function () {});
    
    restartButton.addEventListener('click', restartGame);
   
    singlePlayerToggle.addEventListener('click', function () {
   });
   function handleClick(row, col) {
    if (theWinner || squares[row][col]) {
              return;
    }

    const newSquares = squares.map((row) => [...row]);
    newSquares[row][col] = xIsNext ? 'X' : 'O';

    squares = newSquares;
    squares = newSquares;
    xIsNext = !xIsNext;


    const winner = calculateWinner(newSquares, row, col);
    if (winner) {
              theWinner = winner;
              winningLine = findWinningLine(newSquares, row, col, winner);
    }

    renderBoard();
    updateStatus();

    if (singlePlayerMode && !theWinner && !xIsNext) {
              makeComputerMove();
    }
}
function calculateWinner(currentSquares, row, col) {
    const currentPlayer = currentSquares[row][col];

    // Kiểm tra theo chiều ngang (ngang hàng):
    let count = 1;
    let leftCol = col - 1;
    while (leftCol >= 0 && currentSquares[row][leftCol] === currentPlayer) {
              count++;
              leftCol--;
    }
    let rightCol = col + 1;
    while (rightCol < dimension && currentSquares[row][rightCol] === currentPlayer) {
              count++;
              rightCol++;
    }
    if (count >= 5) {
              return currentPlayer;
    }

    // Kiểm tra theo chiều dọc (dọc cột):
    count = 1;
    let topRow = row - 1;
    while (topRow >= 0 && currentSquares[topRow][col] === currentPlayer) {
              count++;
              topRow--;
    }
    let bottomRow = row + 1;
    while (bottomRow < dimension && currentSquares[bottomRow][col] === currentPlayer) {
              count++;
              bottomRow++;
    }
    if (count >= 5) {
              return currentPlayer;
    }

    // Kiểm tra theo đường chéo (trên cùng bên trái đến dưới cùng bên phải)
    count = 1;
    let topLeftRow = row - 1;
    let topLeftCol = col - 1;
    while (topLeftRow >= 0 && topLeftCol >= 0 && currentSquares[topLeftRow][topLeftCol] === currentPlayer) {
              count++;
              topLeftRow--;
              topLeftCol--;
    }
    let bottomRightRow = row + 1;
    let bottomRightCol = col + 1;
    while (bottomRightRow < dimension && bottomRightCol < dimension && currentSquares[bottomRightRow][bottomRightCol] === currentPlayer) {
              count++;
              bottomRightRow++;
              bottomRightCol++;
    }
    if (count >= 5) {
              return currentPlayer;
    }

    // Kiểm tra theo đường chéo (trên cùng bên phải đến dưới cùng bên trái)
    count = 1;
    let topRightRow = row - 1;
    let topRightCol = col + 1;
    while (topRightRow >= 0 && topRightCol < dimension && currentSquares[topRightRow][topRightCol] === currentPlayer) {
              count++;
              topRightRow--;
              topRightCol++;
    }
    let bottomLeftRow = row + 1;
    let bottomLeftCol = col - 1;
    while (bottomLeftRow < dimension && bottomLeftCol >= 0 && currentSquares[bottomLeftRow][bottomLeftCol] === currentPlayer) {
              count++;
              bottomLeftRow++;
              bottomLeftCol--;
    }
    if (count >= 5) {
              return currentPlayer;
    }

    return null;
}
function findWinningLine(currentSquares, row, col, winner) {
    const currentPlayer = currentSquares[row][col];
    const lines = [];

    // Check horizontally
    let leftCol = col - 1;
    while (leftCol >= 0 && currentSquares[row][leftCol] === currentPlayer) {
              lines.push([row, leftCol]);
              leftCol--;
    }
    lines.push([row, col]);
    let rightCol = col + 1;
    while (rightCol < dimension && currentSquares[row][rightCol] === currentPlayer) {
              lines.push([row, rightCol]);
              rightCol++;
    }
    if (lines.length >= 5) {
              return lines;
    }

    // Check vertically
    let topRow = row - 1;
    while (topRow >= 0 && currentSquares[topRow][col] === currentPlayer) {
              lines.push([topRow, col]);
              topRow--;
    }
    lines.push([row, col]);
    let bottomRow = row + 1;
    while (bottomRow < dimension && currentSquares[bottomRow][col] === currentPlayer) {
              lines.push([bottomRow, col]);
              bottomRow++;
    }
    if (lines.length >= 5) {
              return lines;
    }

    // Check diagonally (top-left to bottom-right)
    let topLeftRow = row - 1;
    let topLeftCol = col - 1;
    while (topLeftRow >= 0 && topLeftCol >= 0 && currentSquares[topLeftRow][topLeftCol] === currentPlayer) {
              lines.push([topLeftRow, topLeftCol]);
              topLeftRow--;
              topLeftCol--;
    }
    lines.push([row, col]);
    let bottomRightRow = row + 1;
    let bottomRightCol = col + 1;
    while (bottomRightRow < dimension && bottomRightCol < dimension && currentSquares[bottomRightRow][bottomRightCol] === currentPlayer) {
              lines.push([bottomRightRow, bottomRightCol]);
              bottomRightRow++;
              bottomRightCol++;
    }
    if (lines.length >= 5) {
              return lines;
    }

    // Check diagonally (top-right to bottom-left)
    let topRightRow = row - 1;
    let topRightCol = col + 1;
    while (topRightRow >= 0 && topRightCol < dimension && currentSquares[topRightRow][topRightCol] === currentPlayer) {
              lines.push([topRightRow, topRightCol]);
              topRightRow--;
              topRightCol++;
    }
    lines.push([row, col]);
    let bottomLeftRow = row + 1;
    let bottomLeftCol = col - 1;
    while (bottomLeftRow < dimension && bottomLeftCol >= 0 && currentSquares[bottomLeftRow][bottomLeftCol] === currentPlayer) {
              lines.push([bottomLeftRow, bottomLeftCol]);
              bottomLeftRow++;
              bottomLeftCol--;
    }
    if (lines.length >= 5) {
              return lines;
    }

    return [];
}
function renderBoard() { boardElement.innerHTML = '';
     for (let row = 0; row < dimension; row++) {
            const rowElement = document.createElement('div');
               rowElement.className = 'board-row';

     for (let col = 0; col < dimension; col++) {
            const value = squares[row][col];
            const isWinningSquare = winningLine.some(([winRow, winCol]) => winRow === row && winCol === col);
            const squareButton = document.createElement('button');
               squareButton.className = 'square';
               squareButton.style.backgroundColor = isWinningSquare ? 'yellow' : 'white';
               squareButton.style.color = value === 'X' ? 'blue' : 'red';
               squareButton.style.fontWeight = isWinningSquare ? 'bold' : 'normal';
               squareButton.textContent = value;
               squareButton.addEventListener('click', () => {
            if (!singlePlayerMode || (singlePlayerMode && xIsNext)) {
                        handleClick(row, col);
                                                 }
                                       });

              rowElement.appendChild(squareButton);
                             }

              boardElement.appendChild(rowElement);
                   }
         }
         function makeComputerMove() {
            if (!singlePlayerMode || theWinner) {
                  return; }
            //  lưu trữ tọa độ của các ô trống trên bàn cờ.
            const availableMoves = []; 
            // gán giá trị 'X' nếu lượt đi là của người chơi X (xIsNext = true), ngược lại 'O'.
            const humanPlayer = xIsNext ? 'X' : 'O';
            const computerPlayer = xIsNext ? 'O' : 'X';
            // lặp qua từng hàng và cột của mảng squares. Nếu ô đó không có giá trị (null),
            //tọa độ của ô đó sẽ được thêm vào mảng availableMoves.
             squares.forEach((row, rowIndex) => {
                  row.forEach((col, colIndex) => {
                     if (!squares[rowIndex][colIndex]) {
                        availableMoves.push([rowIndex, colIndex]);
                                                 }
                                       });
                             });
         
             
                       if (availableMoves.length > 0) {
                        // kiểm tra xem máy tính có thể thắng trong nước đi tiếp theo không.
                         for (let i = 0; i < availableMoves.length; i++) {
                         const [row, col] = availableMoves[i];
                         const newSquares = squares.map((row) => [...row]);
                              newSquares[row][col] = computerPlayer;
                         if (calculateWinner(newSquares, row, col) === computerPlayer) {
                              handleClick(row, col);
                                       return;    }   }
                          // Kiểm tra xem người chơi có thể giành chiến thắng trong nước đi tiếp theo không
                         for (let i = 0; i < availableMoves.length; i++) {
                            const [row, col] = availableMoves[i];
                            const newSquares = squares.map((row) => [...row]);
                                     newSquares[row][col] = humanPlayer;
                            if (calculateWinner(newSquares, row, col) === humanPlayer) {
                               handleClick(row, col);
                                        return;   }     }
                    
                           // Di chuyển ngẫu nhiên 
                          const randomIndex = Math.floor(Math.random() * availableMoves.length);
                           // Nếu không có nguy cơ thắng trong nước đi tiếp theo, 
                          // nó chọn một ô trống ngẫu nhiên từ mảng availableMoves và gọi hàm handleClick để thực hiện nước đi đó.
                          const [row, col] = availableMoves[randomIndex];
                          // Nếu  có ít nhất 3 ô trống khả dụng, kiểm tra xem có nước đi nào dẫn đến chiến thắng cho máy tính không. 
                          //Nếu có, nó gọi hàm handleClick để thực hiện nước đi đó và kết thúc hàm.
                            if (availableMoves.length >= 3) {
                                for (let i = 0; i < availableMoves.length; i++) {
                                      const [row, col] = availableMoves[i];
                                      const newSquares = squares.map((row) => [...row]);
                                            newSquares[row][col] = computerPlayer;
                    
                            if (isWinningMove(newSquares, computerPlayer)) {
                                   handleClick(row, col);
                                   return;    }     }     }
                          // Cuối cùng, nếu không có nước đi đặc biệt nào được chọn 
                          //chọn một ô trống ngẫu nhiên và gọi hàm handleClick để thực hiện nước đi đó.
                                   handleClick(row, col);
                                        }

                                        function isWinningMove(currentSquares, player) {
                                            for (let row = 0; row < dimension; row++) {
                                               for (let col = 0; col < dimension; col++) {
                                                     if (!currentSquares[row][col]) {
                                                          const newSquares = currentSquares.map((row) => [...row]);
                                                          newSquares[row][col] = player;
                                                     if (calculateWinner(newSquares, row, col) === player) {
                                                          return true;    } 
                                                     }   
                                               }    
                                            }
                                                     return false;
                                          }
                                          function updateStatus() {
                                            if (theWinner) {
                                                 statusElement.textContent = `Chiến thắng: ${theWinner}`;
                                            } else {
                                                 statusElement.textContent = `Người chơi: ${xIsNext ? 'X' : 'O'}`;
                                                           }
                                                 }