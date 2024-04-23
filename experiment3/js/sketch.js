// project.js - Alternate Worlds
// Author: Brayden Smith
// Date: 4/23/24

// consulted chatgpt & professors example for inspo/guidance
// consulted Alex Leghart for help integrating into same page

let canvasContainer;
var centerHorz, centerVert;

const w1 = (sketch) => {
  sketch.setup = () => {
    sketch.seed = 1109;
    sketch.tilesetImage;
    sketch.currentGrid = [];
    sketch.numRows, sketch.numCols;

    sketch.numCols = sketch.select("#asciiBoxDungeon").attribute("cols") | 0;
    sketch.numRows = sketch.select("#asciiBoxDungeon").attribute("rows") | 0;
    // place our canvas, making it fit our container
    canvasContainer = $("#canvasContainer-2");
    sketch.canvas = sketch.createCanvas(
      16 * sketch.numCols,
      16 * sketch.numRows
    );
    sketch.canvas.parent("canvasContainer-2");

    sketch.select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

    sketch.select("#reseedButtonDungeon").mousePressed(sketch.reseed);
    sketch.select("#asciiBoxDungeon").input(sketch.reparseGrid);

    sketch.reseed();
  };

  sketch.preload = () => {
    sketch.tilesetImage = sketch.loadImage(
      "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
    );
  };

  sketch.reseed = () => {
    console.log(sketch.seed);
    sketch.seed = (sketch.seed | 0) + 1109;
    sketch.randomSeed(sketch.seed);
    sketch.noiseSeed(sketch.seed);
    sketch.select("#seedReportDungeon").html("seed " + sketch.seed);
    sketch.regenerateGrid();
  };

  sketch.regenerateGrid = () => {
    console.log("making grid");
    sketch
      .select("#asciiBoxDungeon")
      .value(
        sketch.gridToString(sketch.generateGrid(sketch.numCols, sketch.numRows))
      );
    sketch.reparseGrid();
  };
  sketch.reDisplay = () => {
    sketch
      .select("#asciiBoxDungeon")
      .value(sketch.gridToString(sketch.currentGrid));
  };

  sketch.reparseGrid = () => {
    sketch.currentGrid = sketch.stringToGrid(
      sketch.select("#asciiBoxDungeon").value()
    );
  };

  sketch.gridToString = (grid) => {
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      rows.push(grid[i].join(""));
    }
    return rows.join("\n");
  };

  sketch.stringToGrid = (str) => {
    let grid = [];
    let lines = str.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let row = [];
      let chars = lines[i].split("");
      for (let j = 0; j < chars.length; j++) {
        row.push(chars[j]);
      }
      grid.push(row);
    }
    return grid;
  };

  sketch.draw = () => {
    //console.log(sketch.currentGrid)
    sketch.randomSeed(sketch.seed);
    sketch.drawGrid(sketch.currentGrid);
  };

  sketch.placeTile = (i, j, ti, tj) => {
    sketch.image(
      sketch.tilesetImage,
      16 * j,
      16 * i,
      16,
      16,
      8 * ti,
      8 * tj,
      8,
      8
    );
  };

  // sketch.mousePressed = () => {
  //   console.log("hi");
  //   let mX = Math.floor(
  //     (sketch.mouseX / sketch.width) * sketch.currentGrid[0].length
  //   );
  //   let mY = Math.floor(
  //     (sketch.mouseY / sketch.height) * sketch.currentGrid.length
  //   );
  //   if (sketch.currentGrid[mY] != undefined && sketch.currentGrid[mY][mX]) {
  //     if (sketch.currentGrid[mY][mX] == ",") {
  //       sketch.currentGrid[mY][mX] = ".";
  //     } else {
  //       sketch.currentGrid[mY][mX] = ",";
  //     }
  //   }
  //   sketch.reDisplay();
  // };

  //now we get into solution.js

  sketch.generateGrid = (numCols, numRows) => {
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
      let width = Math.floor(sketch.random(3, 7));
      let height = Math.floor(sketch.random(3, 10));

      let startX, startY;
      do {
        startX = Math.floor(sketch.random(1, numCols - width - 1));
        startY = Math.floor(sketch.random(1, numRows - height - 1));
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
      let chosenRoomIndex = Math.floor(sketch.random(0, shapes.length));
      if (!chosenRooms.includes(chosenRoomIndex)) {
        chosenRooms.push(chosenRoomIndex);
        let room = shapes[chosenRoomIndex];
        let chestX = Math.floor(
          sketch.random(room.startX + 1, room.startX + room.width - 1)
        );
        let chestY = Math.floor(
          sketch.random(room.startY + 1, room.startY + room.height - 1)
        );
        grid[chestY][chestX] = "c"; // Placing a chest
        chestsPlaced++;
      }
    }

    // Outlining the shapes and corridors
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (grid[i][j] === "f" || grid[i][j] === "r") {
          [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
          ].forEach((offset) => {
            const ni = i + offset[0];
            const nj = j + offset[1];
            if (
              ni >= 0 &&
              ni < numRows &&
              nj >= 0 &&
              nj < numCols &&
              grid[ni][nj] === "d"
            ) {
              grid[ni][nj] = "o";
            }
          });
        }
      }
    }

    return grid;
  };

  let useAlternate = false;
  let useAlternate2 = false;
  let lastToggle1 = 0;
  let lastToggle2 = 0;

  sketch.drawGrid = (grid) => {
    sketch.background(128);

    const currentTime = sketch.millis();

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
            sketch.placeTile(i, j, Math.floor(sketch.random(1, 4)), 15);
          } else {
            // placeTile(i, j, 21, 21); // Empty tile
            sketch.placeTile(i, j, Math.floor(sketch.random(21, 23)), 21);
          }
        } else if (grid[i][j] === "f") {
          if (useAlternate) {
            sketch.placeTile(i, j, Math.floor(sketch.random(1, 4)), 19);
          } else {
            sketch.placeTile(i, j, Math.floor(sketch.random(4)), 10); // Floor tile
          }
        } else if (grid[i][j] === "c") {
          if (useAlternate2) {
            sketch.placeTile(i, j, 2, 29);
          } else {
            sketch.placeTile(i, j, 5, 29); // Chest tile
          }
        } else if (grid[i][j] === "o") {
          if (useAlternate) {
            sketch.placeTile(i, j, 4, 21);
          } else {
            sketch.placeTile(i, j, 30, 3); // Outline tile
          }
        }
      }
    }
  };
};

let world1 = new p5(w1);

const w2 = (sketch) => {
  sketch.seed = 1100;
  sketch.tilesetImage;
  sketch.currentGrid = [];
  sketch.numRows, sketch.numCols;

  sketch.preload = () => {
    sketch.tilesetImage = sketch.loadImage(
      "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
    );
  };

  sketch.reseed = () => {
    console.log(sketch.seed);
    sketch.seed = (sketch.seed | 0) + 1100;
    sketch.randomSeed(sketch.seed);
    sketch.noiseSeed(sketch.seed);
    sketch.select("#seedReportOverworld").html("seed " + sketch.seed);
    sketch.regenerateGrid();
  };

  sketch.regenerateGrid = () => {
    sketch
      .select("#asciiBoxOverworld")
      .value(
        sketch.gridToString(sketch.generateGrid(sketch.numCols, sketch.numRows))
      );
    sketch.reparseGrid();
  };

  sketch.reparseGrid = () => {
    sketch.currentGrid = sketch.stringToGrid(
      sketch.select("#asciiBoxOverworld").value()
    );
  };

  sketch.gridToString = (grid) => {
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      rows.push(grid[i].join(""));
    }
    return rows.join("\n");
  };

  sketch.stringToGrid = (str) => {
    let grid = [];
    let lines = str.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let row = [];
      let chars = lines[i].split("");
      for (let j = 0; j < chars.length; j++) {
        row.push(chars[j]);
      }
      grid.push(row);
    }
    return grid;
  };

  sketch.setup = () => {
    sketch.numCols = sketch.select("#asciiBoxOverworld").attribute("rows") | 0;
    sketch.numRows = sketch.select("#asciiBoxOverworld").attribute("cols") | 0;

    sketch
      .createCanvas(16 * sketch.numCols, 16 * sketch.numRows)
      .parent("canvasContainerOverworld");
    sketch.select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

    sketch.select("#reseedButtonOverworld").mousePressed(sketch.reseed);
    sketch.select("#asciiBoxOverworld").input(sketch.reparseGrid);

    sketch.reseed();
  };

  sketch.draw = () => {
    sketch.randomSeed(sketch.seed);
    sketch.drawGrid(sketch.currentGrid);
  };

  sketch.placeTile = (i, j, ti, tj) => {
    sketch.image(
      sketch.tilesetImage,
      16 * j,
      16 * i,
      16,
      16,
      8 * ti,
      8 * tj,
      8,
      8
    );
  };

  //now we're in solution.js

  sketch.generateGrid = (numCols, numRows) => {
    const grid = new Array(numRows).fill(null).map(() => new Array(numCols));
  
    const baseY = Math.floor(numRows / 2);
    const waterWidth = 5;
    let xoff = 0;
    const noiseStep = 0.1;
  
    let initialRiverPosition = baseY;
  
    for (let i = 0; i < numRows; i++) {
      xoff += noiseStep;
      let riverPos = initialRiverPosition + Math.floor((sketch.noise(xoff) - 0.5) * 10);
      riverPos = sketch.constrain(riverPos, 0, numRows - waterWidth);
  
      for (let j = 0; j < numCols; j++) {
        if (j >= riverPos && j < riverPos + waterWidth) {
          grid[i][j] = "w";
        } else {
          const innerValue = sketch.noise(i / 20, j / 20);
          grid[i][j] = innerValue > 0.5 ? "d" : "g";
        }
      }
    }
  
    return grid;
  };

  sketch.constrain = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  }

  sketch.drawGrid = (grid) => {
    sketch.background(128);

    const g = 10;
    const t = sketch.millis() / 3000.0;
  
    sketch.noStroke();
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        let delay = sketch.map(i * grid[i].length + j, 0, grid.length * grid[i].length, 0, 2000);
        let tileTime = sketch.millis() - delay;
        let noiseT = tileTime / 3000.0;
  
        sketch.placeTile(i, j, (4 * sketch.pow(sketch.noise(noiseT / 10, i, j / 4 + noiseT), 2)) | 0, 14);
  
        if (sketch.gridCheck(grid, i, j, "d")) {
          if (tileTime % 5000 < 2000) {
            sketch.placeTile(i, j, (4 * sketch.pow(sketch.random(), g)) | 0, 9);
          } else {
            sketch.placeTile(i, j, (4 * sketch.pow(sketch.random(), g)) | 0, 12);
          }
        } else {
          if (tileTime % 5000 < 2000) {
            sketch.drawContext(grid, i, j, "w", 9, 3, true);
          } else {
            sketch.drawContext(grid, i, j, "w", 9, 6, true);
          }
        }
  
        if (sketch.gridCheck(grid, i, j, "g")) {
          if (tileTime % 5000 < 2000) {
            sketch.placeTile(i, j, (4 * sketch.pow(sketch.random(), g)) | 0, 6);
          } else {
            sketch.placeTile(i, j, (4 * sketch.pow(sketch.random(), g)) | 0, 12);
          }
        } else {
          if (tileTime % 5000 < 2000) {
            sketch.drawContext(grid, i, j, "g", 4, 0);
          } else {
            sketch.drawContext(grid, i, j, "g", 4, 6);
          }
        }
  
        if (i >= 10 && i < 16 && j >= 10 && j < 16 && !sketch.gridCheck(grid, i, j, "w")) {
          if (sketch.random() < 0.5) {
            if (tileTime % 5000 < 2000) {
              if (sketch.random() < 0.5) {
                sketch.placeTile(i, j, 26, 3);
              } else {
                sketch.placeTile(i, j, 26, 2);
              }
            } else {
              if (sketch.random() < 0.5) {
                sketch.placeTile(i, j, 27, 3);
              } else {
                sketch.placeTile(i, j, 27, 2);
              }
            }
          }
        }
      }
    }
  };



  sketch.drawContext = (grid, i, j, target, dti, dtj, invert = false) => {
    let code = sketch.gridCode(grid, i, j, target);
    if (invert) {
      code = ~code & 0xf;
    }
    let [ti, tj] = sketch.lookup[code];
    sketch.placeTile(i, j, dti + ti, dtj + tj);
  }
  
  sketch.gridCode = (grid, i, j, target) => {
    return (
      (sketch.gridCheck(grid, i - 1, j, target) << 0) +
      (sketch.gridCheck(grid, i, j - 1, target) << 1) +
      (sketch.gridCheck(grid, i, j + 1, target) << 2) +
      (sketch.gridCheck(grid, i + 1, j, target) << 3)
    );
  }
  
  sketch.gridCheck = (grid, i, j, target) => {
    return i >= 0 && i < grid.length && j >= 0 && j < grid[i].length && grid[i][j] === target;
  }
  
  sketch.lookup = [
    [1, 7],
    [1, 6],
    [0, 7],
    [0, 6],
    [2, 7],
    [2, 6],
    [1, 7],
    [1, 6],
    [1, 8],
    [1, 7],
    [0, 8],
    [0, 7],
    [2, 8],
    [2, 7],
    [1, 8],
    [1, 7]
  ];
};
let world2 = new p5(w2);
