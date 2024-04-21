
let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;

function preload() {
  tilesetImage = loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

function reseed() {
  seed = (seed | 0) + 1100;
  randomSeed(seed);
  noiseSeed(seed);
  select("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(select("#asciiBox").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
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
}

function setup() {
  numCols = select("#asciiBox").attribute("rows") | 0;
  numRows = select("#asciiBox").attribute("cols") | 0;

  createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton").mousePressed(reseed);
  select("#asciiBox").input(reparseGrid);

  reseed();
}


function draw() {
  randomSeed(seed);
  drawGrid(currentGrid);
}

function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}


//inspo from professors code



// /* exported preload, setup, draw, placeTile */

// /* global generateGrid drawGrid */

// let seed = 0;
// let tilesetImage;
// let currentGrid = [];
// let numRows, numCols;

// function preload() {
//   tilesetImage = loadImage(
//     "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
//   );
// }

// function reseed() {
//   seed = (seed | 0) + 1100;
//   randomSeed(seed);
//   noiseSeed(seed);
//   select("#seedReport").html("seed " + seed);
//   regenerateGrid();
// }

// function regenerateGrid() {
//   select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
//   reparseGrid();
// }

// function reparseGrid() {
//   currentGrid = stringToGrid(select("#asciiBox").value());
// }

// function gridToString(grid) {
//   let rows = [];
//   for (let i = 0; i < grid.length; i++) {
//     rows.push(grid[i].join(""));
//   }
//   return rows.join("\n");
// }

// function stringToGrid(str) {
//   let grid = [];
//   let lines = str.split("\n");
//   for (let i = 0; i < lines.length; i++) {
//     let row = [];
//     let chars = lines[i].split("");
//     for (let j = 0; j < chars.length; j++) {
//       row.push(chars[j]);
//     }
//     grid.push(row);
//   }
//   return grid;
// }

// function setup() {
//   numCols = select("#asciiBox").attribute("rows") | 0;
//   numRows = select("#asciiBox").attribute("cols") | 0;

//   createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
//   select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

//   select("#reseedButton").mousePressed(reseed);
//   select("#asciiBox").input(reparseGrid);

//   reseed();
// }


// function draw() {
//   randomSeed(seed);
//   drawGrid(currentGrid);
// }

// function placeTile(i, j, ti, tj) {
//   image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
// }


// let seed2 = 0;
// let tilesetImage;
// let currentGrid2 = [];
// let numRows2, numCols2;

// function preload() {
//     tilesetImage = loadImage("tilesetP8.png");
//   }

// function reseed2() {
//   seed2 = (seed2 | 0) + 1100;
//   randomSeed(seed2);
//   noiseSeed(seed2);
//   select("#seedReport2").html("seed " + seed2);
//   regenerateGrid2();
// }

// function regenerateGrid2() {
//   select("#asciiBox2").value(gridToString2(generateGrid2(numCols2, numRows2)));
//   reparseGrid2();
// }

// function reparseGrid2() {
//   currentGrid2 = stringToGrid2(select("#asciiBox2").value());
// }

// function gridToString2(grid) {
//   let rows = [];
//   for (let i = 0; i < grid.length; i++) {
//     rows.push(grid[i].join(""));
//   }
//   return rows.join("\n");
// }

// function stringToGrid2(str) {
//   let grid = [];
//   let lines = str.split("\n");
//   for (let i = 0; i < lines.length; i++) {
//     let row = [];
//     let chars = lines[i].split("");
//     for (let j = 0; j < chars.length; j++) {
//       row.push(chars[j]);
//     }
//     grid.push(row);
//   }
//   return grid;
// }

// function setup2() {
//   numCols2 = select("#asciiBox2").attribute("rows") | 0;
//   numRows2 = select("#asciiBox2").attribute("cols") | 0;

//   createCanvas(16 * numCols2, 16 * numRows2).parent("canvasContainer2");
//   select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

//   select("#reseedButton2").mousePressed(reseed2);
//   select("#asciiBox2").input(reparseGrid2);

//   reseed2();
// }


// function draw2() {
//   randomSeed(seed2);
//   drawGrid2(currentGrid2);
// }

// function placeTile2(i, j, ti, tj) {
//   image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
// }
