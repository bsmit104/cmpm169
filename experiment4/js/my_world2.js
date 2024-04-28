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

let worldSeed;
let [tw, th] = [p3_tileWidth(), p3_tileHeight()];
let clicks = {};
let ripples = {}; // Object to store ripple effects

function p3_preload() {}

function p3_setup() {}

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

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);

  // Add a ripple effect for the clicked tile
  ripples[key] = frameCount;

  // Propagate the ripple effect to neighboring tiles
  propagateRipple(i, j);
}

function propagateRipple(i, j) {
  // Define the radius of the ripple effect
  let rippleRadius = 2;

  // Loop through neighboring tiles within the ripple radius
  for (let dx = -rippleRadius; dx <= rippleRadius; dx++) {
    for (let dy = -rippleRadius; dy <= rippleRadius; dy++) {
      let ni = i + dx;
      let nj = j + dy;
      let nKey = [ni, nj];

      // Check if the neighboring tile exists and hasn't been clicked yet
      if (clicks[nKey] === undefined) {
        // Calculate the distance between the neighboring tile and the clicked tile
        let distance = dist(i, j, ni, nj);

        // Add a ripple effect to the neighboring tile based on the distance
        if (distance <= rippleRadius) {
          ripples[nKey] = frameCount + rippleRadius - distance;
        }
      }
    }
  }
}

function p3_drawBefore() {
  background(0, 80, 160); // Set background color to a darker shade of blue
}

function p3_drawTile(i, j) {
  noStroke();

  // Define colors
  let deepBlue = color(0, 100, 200, 200);
  let shallowBlue = color(100, 200, 255, 200);
  let green = color(0, 255, 0);
  let tan = color(210, 180, 140);

  // Adjusted noise parameters for higher frequency and variation
  let isIsland = noise(i * 0.05, j * 0.05, 100) > 0.7; // Increased frequency

  // Smooth transition between terrain types using smoothstep function
  let noiseVal = noise(i * 0.05, j * 0.05);
  let smoothNoiseVal = smoothstep(0.4, 0.6, noiseVal); // Smooth transition range
  let tileColor = lerpColor(deepBlue, shallowBlue, smoothNoiseVal);

  fill(isIsland ? tan : tileColor); // Use tan color for islands

  push();

  // Add wave effect
  let waveOffset = sin(frameCount * 0.05 + i * 0.1 + j * 0.1) * 5;
  translate(0, waveOffset);

  // Add ripple effect if the tile was recently clicked
  let key = [i, j];
  if (ripples[key] && frameCount - ripples[key] < 30) { // Adjust the duration of the ripple effect as needed
    let rippleOffset = sin(frameCount * 0.1) * 5; // Adjust the ripple effect parameters as needed
    translate(0, rippleOffset);
  }

  // Draw tile shape
  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  // Add tan border for islands
  if (isIsland) {
    fill(tan);
    strokeWeight(2);
    stroke(tan);
    beginShape();
    vertex(-tw, 0);
    vertex(0, th);
    vertex(tw, 0);
    vertex(0, -th);
    endShape(CLOSE);
  }

  // Add foam or bubbles
  let n = clicks[key] | 0;
  if (n % 2 === 1) {
    fill(255, 255, 255, 128);
    ellipse(0, 0, 10, 5);
    translate(0, -10);
    fill(255, 255, 255, 128);
    ellipse(0, 0, 10, 10);
  }

  // Draw static boats based on deterministic hash
  drawBoats(i, j, worldSeed);

  pop();
}

function drawBoats(i, j, hash) {
  // Define the probability of a boat appearing (e.g., 1 in 200 tiles)
  let boatProbability = 0.005;

  // Use a deterministic hash to decide if this tile should have a boat
  let boatHash = XXH.h32("boat:" + [i, j], hash).toNumber();
  let shouldDrawBoat = boatHash < boatProbability * 0xFFFFFFFF;

  if (shouldDrawBoat) {
    // Define the size of the boat
    let boatWidth = tw * 0.8;
    let boatHeight = th * 0.4;

    // Define the position of the boat
    let boatX = 0;
    let boatY = 0;

    // Draw the boat body (lower rectangle)
    fill(139, 69, 19); // Brown color for boat body
    rectMode(CENTER);
    rect(boatX, boatY, boatWidth, boatHeight); // Adjust size as needed

    // Draw the mast
    let mastHeight = th * 1.2; // Height of the mast
    let mastWidth = tw * 0.1; // Width of the mast
    let mastX = boatX;
    let mastY = boatY - boatHeight / 2 - mastHeight / 2;
    fill(0); // Black color for mast
    rect(mastX, mastY, mastWidth, mastHeight); // Draw the mast

    // Draw the sail
    let sailWidth = mastWidth * 2; // Width of the sail
    let sailHeight = mastHeight * 1.2; // Height of the sail
    let sailX = mastX + mastWidth / 2;
    let sailY = mastY - sailHeight / 2;
    fill(255); // White color for sail
    triangle(
      sailX, sailY,
      sailX - sailWidth / 2, sailY + sailHeight / 2,
      sailX + sailWidth / 2, sailY + sailHeight / 2
    ); // Draw the sail
  }
}

function smoothstep(edge0, edge1, x) {
  // Scale, bias and saturate x to 0..1 range
  x = constrain((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  // Evaluate polynomial
  return x * x * (3 - 2 * x);
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