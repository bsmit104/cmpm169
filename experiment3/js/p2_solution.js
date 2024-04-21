// /* exported generateGrid, drawGrid */
// /* global placeTile */

function generateGrid(numCols, numRows) {
  let grid = [];
  let shapes = [];
  let chestsPlaced = 0;

  const isOccupied = (x, y, width, height, shapes) => {
    for (const shape of shapes) {
      if (
        x + width <= shape.startX ||
        x >= shape.startX + shape.width ||
        y + height <= shape.startY ||
        y >= shape.startY + shape.height
      ) {
        // No overlap
      } else {
        return true; // Overlap detected
      }
      if (
        x + width + 1 >= shape.startX &&
        x - 1 <= shape.startX + shape.width &&
        y + height + 1 >= shape.startY &&
        y - 1 <= shape.startY + shape.height
      ) {
        return true; // Adjacent room detected
      }
    }
    return false;
  };

  for (let s = 0; s < 3; s++) {
    let width = Math.floor(random(3, 7));
    let height = Math.floor(random(3, 10));

    let startX, startY;
    do {
      startX = Math.floor(random(1, numCols - width - 1));
      startY = Math.floor(random(1, numRows - height - 1));
      if (!isOccupied(startX, startY, width, height, shapes)) {
        shapes.push({ startX, startY, width, height });
        break;
      }
    } while (true);
  }

  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("d");
    }
    grid.push(row);
  }

  // Placing the shapes
  for (const shape of shapes) {
    for (let i = shape.startY; i < shape.startY + shape.height; i++) {
      for (let j = shape.startX; j < shape.startX + shape.width; j++) {
        grid[i][j] = "f";
      }
    }
  }

  // Placing the corridors
  for (let i = 1; i < shapes.length; i++) {
    let startX = Math.floor(shapes[i - 1].startX + shapes[i - 1].width / 2);
    let startY = Math.floor(shapes[i - 1].startY + shapes[i - 1].height / 2);
    let endX = Math.floor(shapes[i].startX + shapes[i].width / 2);
    let endY = Math.floor(shapes[i].startY + shapes[i].height / 2);

    while (startX !== endX) {
      grid[startY][startX] = "f"; // Using "r" for corridors
      startX += startX < endX ? 1 : -1;
    }
    while (startY !== endY) {
      grid[startY][startX] = "f"; // Using "r" for corridors
      startY += startY < endY ? 1 : -1;
    }
  }

  // Randomly place chests in two different rooms
  let chosenRooms = [];
  while (chestsPlaced < 2) {
    let chosenRoomIndex = Math.floor(random(0, shapes.length));
    if (!chosenRooms.includes(chosenRoomIndex)) {
      chosenRooms.push(chosenRoomIndex);
      let room = shapes[chosenRoomIndex];
      let chestX = Math.floor(random(room.startX + 1, room.startX + room.width - 1));
      let chestY = Math.floor(random(room.startY + 1, room.startY + room.height - 1));
      grid[chestY][chestX] = "c"; // Placing a chest
      chestsPlaced++;
    }
  }

  // Outlining the shapes and corridors
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (grid[i][j] === "f" || grid[i][j] === "r") {
        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(offset => {
          const ni = i + offset[0];
          const nj = j + offset[1];
          if (ni >= 0 && ni < numRows && nj >= 0 && nj < numCols && grid[ni][nj] === "d") {
            grid[ni][nj] = "o";
          }
        });
      }
    }
  }

  return grid;
}

let useAlternate = false;
let useAlternate2 = false;
let lastToggle1 = 0;
let lastToggle2 = 0;

function drawGrid(grid) {
  background(128);
  const currentTime = millis();

  if (currentTime - lastToggle1 > 3000) {
    useAlternate = !useAlternate;
    lastToggle1 = currentTime;
  }
  if (currentTime - lastToggle2 > 1500) {
    useAlternate2 = !useAlternate2;
    lastToggle2 = currentTime;
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "d") {
        if (useAlternate) {
          // placeTile(i, j, 16, 4);
          placeTile(i, j, Math.floor(random(1, 4)), 15);
        } else {
          // placeTile(i, j, 21, 21); // Empty tile
          placeTile(i, j, Math.floor(random(21, 23)), 21);
        }
      } else if (grid[i][j] === "f") {
        if (useAlternate) {
          placeTile(i, j, Math.floor(random(1, 4)), 19);
        } else {
          placeTile(i, j, Math.floor(random(4)), 10); // Floor tile
        }
      } else if (grid[i][j] === "c") {
        if (useAlternate2) {
          placeTile(i, j, 2, 29);
        } else {
          placeTile(i, j, 5, 29); // Chest tile
        }
      } else if (grid[i][j] === "o") {
        if (useAlternate) {
          placeTile(i, j, 4, 21);
        } else {
          placeTile(i, j, 30, 3); // Outline tile
        }
      }
    }
  }
}

//inspo from chatgpt





// function generateGrid(numCols, numRows) {
//     let grid = [];
//     let shapes = [];
//     let chestsPlaced = 0;
  
//     const isOccupied = (x, y, width, height, shapes) => {
//       for (const shape of shapes) {
//         if (
//           x + width <= shape.startX ||
//           x >= shape.startX + shape.width ||
//           y + height <= shape.startY ||
//           y >= shape.startY + shape.height
//         ) {
//           // No overlap
//         } else {
//           return true; // Overlap detected
//         }
//         if (
//           x + width + 1 >= shape.startX &&
//           x - 1 <= shape.startX + shape.width &&
//           y + height + 1 >= shape.startY &&
//           y - 1 <= shape.startY + shape.height
//         ) {
//           return true; // Adjacent room detected
//         }
//       }
//       return false;
//     };
  
//     for (let s = 0; s < 3; s++) {
//       let width = Math.floor(random(3, 7));
//       let height = Math.floor(random(3, 10));
  
//       let startX, startY;
//       do {
//         startX = Math.floor(random(1, numCols - width - 1));
//         startY = Math.floor(random(1, numRows - height - 1));
//         if (!isOccupied(startX, startY, width, height, shapes)) {
//           shapes.push({ startX, startY, width, height });
//           break;
//         }
//       } while (true);
//     }
  
//     for (let i = 0; i < numRows; i++) {
//       let row = [];
//       for (let j = 0; j < numCols; j++) {
//         row.push("d");
//       }
//       grid.push(row);
//     }
  
//     // Placing the shapes
//     for (const shape of shapes) {
//       for (let i = shape.startY; i < shape.startY + shape.height; i++) {
//         for (let j = shape.startX; j < shape.startX + shape.width; j++) {
//           grid[i][j] = "f";
//         }
//       }
//     }
  
//     // Placing the corridors
//     for (let i = 1; i < shapes.length; i++) {
//       let startX = Math.floor(shapes[i - 1].startX + shapes[i - 1].width / 2);
//       let startY = Math.floor(shapes[i - 1].startY + shapes[i - 1].height / 2);
//       let endX = Math.floor(shapes[i].startX + shapes[i].width / 2);
//       let endY = Math.floor(shapes[i].startY + shapes[i].height / 2);
  
//       while (startX !== endX) {
//         grid[startY][startX] = "f"; // Using "r" for corridors
//         startX += startX < endX ? 1 : -1;
//       }
//       while (startY !== endY) {
//         grid[startY][startX] = "f"; // Using "r" for corridors
//         startY += startY < endY ? 1 : -1;
//       }
//     }
  
//     // Randomly place chests in two different rooms
//     let chosenRooms = [];
//     while (chestsPlaced < 2) {
//       let chosenRoomIndex = Math.floor(random(0, shapes.length));
//       if (!chosenRooms.includes(chosenRoomIndex)) {
//         chosenRooms.push(chosenRoomIndex);
//         let room = shapes[chosenRoomIndex];
//         let chestX = Math.floor(random(room.startX + 1, room.startX + room.width - 1));
//         let chestY = Math.floor(random(room.startY + 1, room.startY + room.height - 1));
//         grid[chestY][chestX] = "c"; // Placing a chest
//         chestsPlaced++;
//       }
//     }
  
//     // Outlining the shapes and corridors
//     for (let i = 0; i < numRows; i++) {
//       for (let j = 0; j < numCols; j++) {
//         if (grid[i][j] === "f" || grid[i][j] === "r") {
//           [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(offset => {
//             const ni = i + offset[0];
//             const nj = j + offset[1];
//             if (ni >= 0 && ni < numRows && nj >= 0 && nj < numCols && grid[ni][nj] === "d") {
//               grid[ni][nj] = "o";
//             }
//           });
//         }
//       }
//     }
  
//     return grid;
//   }
  
  
//   let useAlternate = false;
//   let useAlternate2 = false;
  
//   function drawGrid(grid) {
//     background(128);
  
//     for (let i = 0; i < grid.length; i++) {
//       for (let j = 0; j < grid[i].length; j++) {
//         if (grid[i][j] === "d") {
//           if (useAlternate) {
//             placeTile(i, j, 16, 4);
//           } else {
//             placeTile(i, j, 21, 21); // Empty tile
//           }
//         } else if (grid[i][j] === "f") {
//           if (useAlternate) {
//             placeTile(i, j, Math.floor(random(1, 4)), 19);
//           } else {
//             placeTile(i, j, Math.floor(random(4)), 10); // Floor tile
//           }
//         } else if (grid[i][j] === "c") {
//           if (useAlternate2) {
//             placeTile(i, j, 2, 29);
//           } else {
//             placeTile(i, j, 5, 29); // Chest tile
//           }
//         } else if (grid[i][j] === "o") {
//           if (useAlternate) {
//             placeTile(i, j, 4, 21);
//           } else {
//             placeTile(i, j, 30, 3); // Outline tile
//           }
//         }
//       }
//     }
//   }
  
//   // Toggle the useAlternate flag every 3 seconds
//   setInterval(() => {
//     useAlternate = !useAlternate;
//   }, 3000);
//   setInterval(() => {
//     useAlternate2 = !useAlternate2;
//   }, 1500);