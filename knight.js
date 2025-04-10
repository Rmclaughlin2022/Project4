const boardSize = 8;

  const knightMoves = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1],
  ];

  const buildKnightGraph = () => {
    const graph = {};

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const node = `${row},${col}`;
        graph[node] = [];

        knightMoves.forEach(([dx, dy]) => {
          const newRow = row + dx;
          const newCol = col + dy;

          if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
            graph[node].push(`${newRow},${newCol}`);
          }
        });
      }
    }

    return graph;
  };

  const knightGraph = buildKnightGraph();
  console.log(knightGraph); 
  
  const board = document.getElementById('board');

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
      cell.setAttribute('data-coord', `${row},${col}`);
      board.appendChild(cell);
    }
  }