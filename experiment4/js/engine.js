"use strict";

/* global p5 */
/* exported preload, setup, draw, mouseClicked */

// Project base code provided by {amsmith,ikarth}@ucsc.edu

let tile_width_step_main; // A width step is half a tile's width
let tile_height_step_main; // A height step is half a tile's height

// Global variables. These will mostly be overwritten in setup().
let tile_rows, tile_columns;
let camera_offset;
let camera_velocity;

let waldoCountElement;
let waldosFound = 0;

/////////////////////////////
// Transforms between coordinate systems
// These are actually slightly weirder than in full 3d...
/////////////////////////////
function worldToScreen([world_x, world_y], [camera_x, camera_y]) {
  let i = (world_x - world_y) * tile_width_step_main;
  let j = (world_x + world_y) * tile_height_step_main;
  return [i + camera_x, j + camera_y];
}

function worldToCamera([world_x, world_y], [camera_x, camera_y]) {
  let i = (world_x - world_y) * tile_width_step_main;
  let j = (world_x + world_y) * tile_height_step_main;
  return [i, j];
}

function tileRenderingOrder(offset) {
  return [offset[1] - offset[0], offset[0] + offset[1]];
}

function screenToWorld([screen_x, screen_y], [camera_x, camera_y]) {
  screen_x -= camera_x;
  screen_y -= camera_y;
  screen_x /= tile_width_step_main * 2;
  screen_y /= tile_height_step_main * 2;
  screen_y += 0.5;
  return [Math.floor(screen_y + screen_x), Math.floor(screen_y - screen_x)];
}

function cameraToWorldOffset([camera_x, camera_y]) {
  let world_x = camera_x / (tile_width_step_main * 2);
  let world_y = camera_y / (tile_height_step_main * 2);
  return { x: Math.round(world_x), y: Math.round(world_y) };
}

function worldOffsetToCamera([world_x, world_y]) {
  let camera_x = world_x * (tile_width_step_main * 2);
  let camera_y = world_y * (tile_height_step_main * 2);
  return new p5.Vector(camera_x, camera_y);
}

function preload() {
  if (window.p3_preload) {
    window.p3_preload();
  }
}

let bodyColors = [];


function setup() {
  
  let canvas = createCanvas(800, 400);
  canvas.parent("container");

  camera_offset = new p5.Vector(-width / 2, height / 2);
  camera_velocity = new p5.Vector(0, 0);

  if (window.p3_setup) {
    window.p3_setup();
  }

  let label = createP();
  label.html("World key: ");
  label.parent("container");

  let input = createInput("xyzzy");
  input.parent(label);
  input.input(() => {
    rebuildWorld(input.value());
  });

  createP("Arrow keys scroll. Clicking changes tiles.").parent("container");

  rebuildWorld(input.value());

  waldoCountElement = createP("Waldos found: 0");
  waldoCountElement.parent("container");

  //   let bodyColors = [
  //     color(255, 0, 0),     // Red
  //     color(0, 255, 0),     // Green
  //     color(0, 0, 255),     // Blue
  //     color(255, 255, 0),   // Yellow
  //     color(255, 0, 255),   // Magenta
  //     color(0, 255, 255),   // Cyan
  //     color(255, 128, 0),   // Orange
  //     color(128, 0, 255),   // Purple
  //     color(0, 255, 128),   // Teal
  //     color(255, 128, 128), // Light Red
  //     color(128, 255, 0),   // Lime
  //     color(0, 128, 255),   // Sky Blue
  //     color(255, 255, 128), // Pale Yellow
  //     color(255, 128, 255), // Pink
  //     color(128, 255, 128), // Light Green
  //     color(128, 128, 255), // Light Blue
  //     color(255, 128, 128), // Light Red
  //     color(128, 255, 255), // Light Cyan
  //     color(255, 255, 255), // White
  //     color(128, 128, 128)  // Gray
  // ];

  bodyColors = [];

  // Define the body colors
  bodyColors.push(color(255, 0, 0)); // Red
  bodyColors.push(color(0, 255, 0)); // Green
  bodyColors.push(color(0, 0, 255)); // Blue
  bodyColors.push(color(255, 255, 0)); // Yellow
  bodyColors.push(color(255, 0, 255)); // Magenta
  bodyColors.push(color(0, 255, 255)); // Cyan
  bodyColors.push(color(255, 128, 0)); // Orange
  bodyColors.push(color(128, 0, 255)); // Purple
  bodyColors.push(color(0, 255, 128)); // Teal
  bodyColors.push(color(255, 128, 128)); // Light Red
  bodyColors.push(color(128, 255, 0)); // Lime
  bodyColors.push(color(0, 128, 255)); // Sky Blue
  bodyColors.push(color(255, 255, 128)); // Pale Yellow
  bodyColors.push(color(255, 128, 255)); // Pink
  bodyColors.push(color(128, 255, 128)); // Light Green
  bodyColors.push(color(128, 128, 255)); // Light Blue
  bodyColors.push(color(255, 128, 128)); // Light Red
  bodyColors.push(color(128, 255, 255)); // Light Cyan
  bodyColors.push(color(255, 255, 255)); // White
  bodyColors.push(color(128, 128, 128)); // Gray

  let rows = tile_rows;
  let columns = tile_columns;
  for (let i = 0; i < columns; i++) {
    bodyColors[i] = []; // Initialize array for each column
    for (let j = 0; j < rows; j++) {
      bodyColors[i][j] = random(bodyColors); // Randomly select a body color
    }
  }
}

function rebuildWorld(key) {
  if (window.p3_worldKeyChanged) {
    window.p3_worldKeyChanged(key);
  }
  tile_width_step_main = window.p3_tileWidth ? window.p3_tileWidth() : 32;
  tile_height_step_main = window.p3_tileHeight ? window.p3_tileHeight() : 14.5;
  tile_columns = Math.ceil(width / (tile_width_step_main * 2));
  tile_rows = Math.ceil(height / (tile_height_step_main * 2));
}

function mouseClicked() {
  let world_pos = screenToWorld(
    [0 - mouseX, mouseY],
    [camera_offset.x, camera_offset.y]
  );

  // Check if the clicked tile contains Waldo
  if (window.p3_tileClicked) {
    let isWaldo = window.p3_tileClicked(world_pos[0], world_pos[1]);
    if (isWaldo) {
      waldosFound++;
      // Update the display of Waldos found
      waldoCountElement.html("Waldos found: " + waldosFound);
    }
  }
  return false;
}

function draw() {
  // Keyboard controls!
  if (keyIsDown(LEFT_ARROW)) {
    camera_velocity.x -= 1;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    camera_velocity.x += 1;
  }
  if (keyIsDown(DOWN_ARROW)) {
    camera_velocity.y -= 1;
  }
  if (keyIsDown(UP_ARROW)) {
    camera_velocity.y += 1;
  }

  let camera_delta = new p5.Vector(0, 0);
  camera_velocity.add(camera_delta);
  camera_offset.add(camera_velocity);
  camera_velocity.mult(0.95); // cheap easing
  if (camera_velocity.mag() < 0.01) {
    camera_velocity.setMag(0);
  }

  let world_pos = screenToWorld(
    [0 - mouseX, mouseY],
    [camera_offset.x, camera_offset.y]
  );
  let world_offset = cameraToWorldOffset([camera_offset.x, camera_offset.y]);

  background(100);

  if (window.p3_drawBefore) {
    window.p3_drawBefore();
  }

  let overdraw = 0.1;

  let y0 = Math.floor((0 - overdraw) * tile_rows);
  let y1 = Math.floor((1 + overdraw) * tile_rows);
  let x0 = Math.floor((0 - overdraw) * tile_columns);
  let x1 = Math.floor((1 + overdraw) * tile_columns);

  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      drawTile(tileRenderingOrder([x + world_offset.x, y - world_offset.y]), [
        camera_offset.x,
        camera_offset.y,
      ]); // odd row
    }
    for (let x = x0; x < x1; x++) {
      drawTile(
        tileRenderingOrder([
          x + 0.5 + world_offset.x,
          y + 0.5 - world_offset.y,
        ]),
        [camera_offset.x, camera_offset.y]
      ); // even rows are offset horizontally
    }
  }

  describeMouseTile(world_pos, [camera_offset.x, camera_offset.y]);

  if (window.p3_drawAfter) {
    window.p3_drawAfter();
  }
}

// Display a discription of the tile at world_x, world_y.
function describeMouseTile([world_x, world_y], [camera_x, camera_y]) {
  let [screen_x, screen_y] = worldToScreen(
    [world_x, world_y],
    [camera_x, camera_y]
  );
  drawTileDescription([world_x, world_y], [0 - screen_x, screen_y]);
}

function drawTileDescription([world_x, world_y], [screen_x, screen_y]) {
  push();
  translate(screen_x, screen_y);
  if (window.p3_drawSelectedTile) {
    window.p3_drawSelectedTile(world_x, world_y, screen_x, screen_y);
  }
  pop();
}

// Draw a tile, mostly by calling the user's drawing code.
function drawTile([world_x, world_y], [camera_x, camera_y]) {
  let [screen_x, screen_y] = worldToScreen(
    [world_x, world_y],
    [camera_x, camera_y]
  );
  push();
  translate(0 - screen_x, screen_y);
  if (window.p3_drawTile) {
    window.p3_drawTile(world_x, world_y, -screen_x, screen_y);
  }
  pop();
}
