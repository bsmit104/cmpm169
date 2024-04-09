// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvas;
let canvasContainer;
var centerHorz, centerVert;
let seed = 239;

const randompink = "#fe019a";
const buildingLightBlue = "#00ffef";
const black = "#000000";
const skyDarkBlue = "#000057";
const buildingDarkBlue = "#00008B";
const waterBlue = "#030158";
const randompurp = "#5552fc";

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function setup() {  
  let canvasContainer = $("#canvas-container");
  canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  $(window).resize(resizeCanvasToFitContainer);
  resizeCanvasToFitContainer();

  $("#reimagine").on("click", function() {
    seed++;
  });

  setInterval(autoGen, 5000);
}

function autoGen() {
  seed++;
  redraw();
}

function resizeCanvasToFitContainer() {
  let canvasContainer = $("#canvas-container");
  canvas.resize(canvasContainer.width(), canvasContainer.height());
}

function draw() {
  randomSeed(seed);

  background(100);

  noStroke();

  fill(skyDarkBlue);
  rect(0, 0, width, height);

  let numRectangles = 10;
  let rectWidth = width / numRectangles;

  for (let i = 0; i < numRectangles; i++) {
    let rectHeight = random(height) * 0.75;
    let fillColor = random() > 0.5 ? buildingDarkBlue : buildingLightBlue;

    let rectY = height * 0.75 - rectHeight;

    fill(fillColor);
    rect(i * rectWidth, rectY, rectWidth, rectHeight);
  }
  
  for (let i = 0; i < numRectangles; i++) {
    let rectHeight = random(height) * 0.75;
    let fillColor = randompink;

    let rectY = height * 0.55 + rectHeight;

    fill(fillColor);
    rect(i * rectWidth, rectY, rectWidth, rectHeight);
  }
  
  for (let i = 0; i < numRectangles; i++) {
    let rectHeight = random(height) * 0.75;
    let fillColor = randompurp;

    let rectY = height * 0.55 + rectHeight;

    fill(fillColor);
    rect(i * rectWidth, rectY, rectWidth, rectHeight);
  }

  fill(black);
  rect(0, height * 0.75, width, height * 0.25);

  
  let numRectangles2 = 10;
  let rectWidth2 = width / numRectangles;

  for (let i = 0; i < numRectangles2; i++) {
    let top = height * 0.75; 
    let bottom = random(top, height);
    fill(waterBlue);
    rect(i * rectWidth2, top, rectWidth2, bottom - top);
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}

// queried with chatgpt about shapes
// https://chat.openai.com/share/c2ad1c7c-bcd5-4df0-978f-5a4cf50ee45a