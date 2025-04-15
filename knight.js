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

let startCoord = null;
let endCoord = null;

board.addEventListener('click', (e) => {
  const cell = e.target;
  const coord = cell.getAttribute('data-coord');
  if (!startCoord) {
    startCoord = coord;
    cell.classList.add('start');
  } else if (!endCoord) {
    endCoord = coord;
    cell.classList.add('end');

    const path = findShortestPath(startCoord, endCoord, knightGraph);
    if (path) {
      highlightPath(path);
    }
    startCoord = null;
    endCoord = null;
  }
});

function findShortestPath(start, end, graph) {
  const queue = [[start]];
  const visited = new Set();
  visited.add(start);

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

    if (current === end) {
      return path;
    }

    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }
  return null;
}

function highlightPath(path) {

  const existingHorse = document.querySelector('.horse-icon');
  if (existingHorse) {
    existingHorse.remove();
  }

  const moveList = document.getElementById('move-list');
  moveList.innerHTML = ' '; 

  let currentHorse = null;

  path.forEach((coord, index) => {
    setTimeout(() => {

      const cell = document.querySelector(`[data-coord='${coord}']`);
      if (cell) {
        cell.classList.add('path');
        cell.textContent = index;
      }

  
      if (currentHorse) {
        currentHorse.remove();
      }
      currentHorse = placeHorse(coord);

      const moveItem = document.createElement('span');
      moveItem.textContent = coordToChessNotation(coord);
      
      if (index !== 0) {
        moveList.append(', ');
      }
      
      moveList.appendChild(moveItem);
    }, index * 500);
  });
}

function placeHorse(coord) {
  const cell = document.querySelector(`[data-coord='${coord}']`);
  if (cell) {
    const horseImg = document.createElement('img');
    horseImg.src = '/images/horse.png'; 
    horseImg.classList.add('horse-icon');
    cell.appendChild(horseImg);
    return horseImg; 
  }
  return null;
}

function coordToChessNotation(coord) {
  const [row, col] = coord.split(',').map(Number);
  const file = String.fromCharCode('a'.charCodeAt(0) + col); 
  const rank = 7 - row + 1; 
  return `${file}${rank}`;
}

function resetBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.classList.remove('start', 'end', 'path');
    cell.textContent = '';
    const horse = cell.querySelector('.horse-icon');
    if (horse) {
      horse.remove();
    }
  });

  document.getElementById('move-list').innerHTML = '';
  startCoord = null;
  endCoord = null;
}
placeHorse("4,3");

const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', resetBoard);