
"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 16;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

// Track the number of found Waldos
let waldoCount = 0;

// Add a function to randomly decide if a tile contains Waldo
function isWaldoTile(i, j) {
  // Seed for consistent randomness
  let seed = XXH.h32("waldo:" + [i, j], worldSeed);
  // console.log(`Tile (${i}, ${j}): Seed=${seed}`);
  // Adjust the probability to change the frequency of Waldo appearances
  let isWaldo = seed % 100 === 0;
  // console.log(`Tile (${i}, ${j}): Waldo=${isWaldo}`);
  return isWaldo;
}

function p3_drawTile(i, j) {
  noStroke();

  let isWaldo = isWaldoTile(i, j);
  let key = i + "," + j;

  let biomeColor;
  let noiseValue = noise(i * 0.1, j * 0.1);
  if (noiseValue < 0.33) {
    biomeColor = color(0, 0, 255); // Blue
  } else if (noiseValue < 0.66) {
    biomeColor = color(0, 255, 0); // Green
  } else {
    biomeColor = color(139, 69, 19); // Brown
  }

  // Check if the current tile is blue
  let isBlue = biomeColor.levels[2] === 255;

  // Check if neighboring tiles are not blue
  let isBorderTile =
    isBlue &&
    (noise((i - 1) * 0.1, j * 0.1) >= 0.33 ||
      noise((i + 1) * 0.1, j * 0.1) >= 0.33 ||
      noise(i * 0.1, (j - 1) * 0.1) >= 0.33 ||
      noise(i * 0.1, (j + 1) * 0.1) >= 0.33);

  // Change color to yellow for border tiles
  if (isBorderTile) {
    fill(255, 255, 0); // Yellow
  } else if (clicks[key] && isWaldo) {
    fill(255, 0, 0); // Red
  } else {
    fill(biomeColor); // Normal biome color
  }
  
  if (clicks[key] && isWaldo) {
    fill(255, 0, 0); // Red
  } else if (isBorderTile) {
    fill(255, 255, 0); // Yellow
  }
  else {
    fill(biomeColor); // Normal biome color
  }

  push();
  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  if (!isBlue || isBorderTile) {
    let noiseValue2 = noise(i * 0.9, j * 0.9);
    translate(0, th / 4);
    if (noiseValue2 < 0.1) {
      fill(color(250, 214, 165)); // magenta
    } else if (noiseValue2 < 0.2) {
      fill(color(255, 224, 189)); // pink
    } else if (noiseValue2 < 0.5) {
      fill(color(255, 224, 189)); // magenta
    } else if (noiseValue2 < 0.8) {
      fill(color(113, 69, 42)); // magenta
    } else {
      fill(color(229, 194, 152));
    }
    // fill(255); // White for the person
    ellipse(0, -th / 4, 8, 8); // Head

    // let noiseValue2 = noise(i * 0.9, j * 0.9);
    if (noiseValue2 < 0.1) {
      fill(color(255, 128, 255)); // pink
    } else if (noiseValue2 < 0.2) {
      fill(color(255, 0, 255)); // magenta
    } else if (noiseValue2 < 0.3) {
      fill(color(255, 128, 0)); //orange
    } else if (noiseValue2 < 0.4) {
      fill(color(128, 0, 255));
    } else if (noiseValue2 < 0.5) {
      fill(color(255, 128, 128));
    } else if (noiseValue2 < 0.6) {
      fill(color(0, 128, 255));
    } else if (noiseValue2 < 0.8) {
      fill(color(255, 0, 255));
    } else if (noiseValue2 < 0.9) {
      fill(color(255, 0, 255));
    } else if (noiseValue2 < 0.95) {
      fill(color(255, 128, 128));
    } else if (noiseValue2 < 0.05) {
      fill(color(255, 0, 255));
    } else if (noiseValue2 < 0.15) {
      fill(color(255, 0, 255));
    } else {
      fill(color(0, 255, 255));
    }
    rect(-2, -th / 4 + 4, 4, 16); // Body
    line(-3, -th / 4 + 20, -6, -th / 4 + 26); // Left leg
    line(3, -th / 4 + 20, 6, -th / 4 + 26); // Right leg
    line(-3, -th / 4 + 10, -6, -th / 4 + 14); // Left arm
    line(3, -th / 4 + 10, 6, -th / 4 + 14); // Right arm

    if (isWaldo) {
      fill(255, 0, 0); // Red hat
      triangle(-3, -th / 4 - 2, 3, -th / 4 - 2, 0, -th / 4 - 6);
    }
  }
  pop();
}

function p3_tileClicked(i, j) {
  let key = i + "," + j; // Use a string key for object mapping

  // Check if the tile has already been clicked and found to have Waldo
  if (clicks[key] === true) {
    return false; // Already found Waldo here, do not increase count
  }

  // Check if it's a Waldo tile
  if (isWaldoTile(i, j)) {
    // Increment the Waldo count only if it has not been clicked before
    waldoCount++;
    // Mark this tile as clicked with Waldo found
    clicks[key] = true;
    // Update UI with the new count
    updateWaldoCountUI();
    return true; // Waldo was clicked and counted
  }

  // Optionally track clicks for non-Waldo tiles (e.g., for statistics)
  clicks[key] = clicks[key] ? clicks[key] + 1 : 1;
  return false; // No Waldo here or already clicked
}


// Function to update the UI with the current count of found Waldos
function updateWaldoCountUI() {
  // Display the count on the screen
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text("Waldos found: " + waldoCount, 20, 20);
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}
