
/* exported preload, setup, draw */
/* global memory, dropper, restart, rate, slider, activeScore, bestScore, fpsCounter */
/* global p4_inspirations, p4_initialize, p4_render, p4_mutate */
// inspired from Adam Smith's variation of the project

let bestDesign;
let currentDesign;
let currentScore;
let currentInspiration;
let currentCanvas;
let currentInspirationPixels;

function preload() {
  

  let allInspirations = p4_inspirations();

  for (let i = 0; i < allInspirations.length; i++) {
    let insp = allInspirations[i];
    insp.image = loadImage(insp.assetUrl);
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = insp.name;
    dropper.appendChild(option);
  }
  dropper.onchange = e => inspirationChanged(allInspirations[e.target.value]);
  currentInspiration = allInspirations[0];

  restart.onclick = () =>
    inspirationChanged(allInspirations[dropper.value]);
}

function inspirationChanged(nextInspiration) {
  currentInspiration = nextInspiration;
  currentDesign = undefined;
  memory.innerHTML = "";
  setup();
}

let numCircsInput = document.getElementById("numCircsInput");
let numCircsDisplay = document.getElementById("numCircsDisplay");

// function setup() {
//   currentCanvas = createCanvas(width, height);
//   currentCanvas.parent(document.getElementById("active"));
//   currentScore = Number.NEGATIVE_INFINITY;
//   let numCircs = parseInt(numCircsInput.value); // Read the value from input
//   currentDesign = p4_initialize(currentInspiration, numCircs); // Pass the value to p4_initialize
//   bestDesign = currentDesign;
//   image(currentInspiration.image, 0, 0, width, height);
//   loadPixels();
//   currentInspirationPixels = pixels;
// }

// Add an event listener to the hue slider
let hueSlider = document.getElementById("hueSlider");
let saturationSlider = document.getElementById("saturationSlider");
let lightnessSlider = document.getElementById("lightnessSlider");
let alphaSlider = document.getElementById("alphaSlider");

hueSlider.addEventListener("input", function() {
  currentDesign = adjustHue(currentDesign, this.value); // Update the hue
  setup();
});

saturationSlider.addEventListener("input", function() {
  currentDesign = adjustColor(currentDesign, 'saturation', this.value);
  setup();
});

lightnessSlider.addEventListener("input", function() {
  currentDesign = adjustColor(currentDesign, 'lightness', this.value);
  setup();
});

alphaSlider.addEventListener("input", function() {
  currentDesign = adjustColor(currentDesign, 'alpha', this.value);
  setup();
});

// Update the setup function to use the adjusted background hue value
function setup() {
  currentCanvas = createCanvas(width, height);
  currentCanvas.parent(document.getElementById("active"));
  currentScore = Number.NEGATIVE_INFINITY;
  let numCircs = parseInt(numCircsInput.value); // Read the value from input
  currentDesign = p4_initialize(currentInspiration, numCircs); // Pass the value to p4_initialize
  currentDesign = adjustHue(currentDesign, hueSlider.value); // Adjust the hue
  bestDesign = currentDesign;
  image(currentInspiration.image, 0, 0, width, height);
  loadPixels();
  currentInspirationPixels = pixels;
}

// function setup() {
//   currentCanvas = createCanvas(width, height);
//   currentCanvas.parent(document.getElementById("active"));
//   currentScore = Number.NEGATIVE_INFINITY;
//   let numCircs = parseInt(numCircsInput.value); // Read the value from input
//   currentDesign = p4_initialize(currentInspiration, numCircs); // Pass the value to p4_initialize
//   bestDesign = currentDesign;
//   image(currentInspiration.image, 0, 0, width, height);
//   loadPixels();
//   currentInspirationPixels = pixels;

//   // Add event listener for background hue slider
//   let bgHueSlider = document.getElementById("bgHueSlider");
//   bgHueSlider.addEventListener("input", function() {
//       // Update the background hue
//       currentDesign.bg[0] = parseInt(this.value); // Assuming the background hue is stored in the first element of the bg array
//       // Redraw the design
//       p4_render(currentDesign, currentInspiration);
//   });
// }

// Add an event listener to update the display when the input value changes
numCircsInput.addEventListener("input", function() {
  numCircsDisplay.textContent = this.value;
  setup();
});

// let hueSlider = document.getElementById("hueSlider");

// hueSlider.addEventListener("input", function() {
//   currentDesign = adjustHue(currentDesign, this.value); // Update the hue
//   setup();
// });

function evaluate() {
  loadPixels();

  let error = 0;
  let n = pixels.length;
  
  for (let i = 0; i < n; i++) {
    error += sq(pixels[i] - currentInspirationPixels[i]);
  }
  return 1/(1+error/n);
}



function memorialize() {
  let url = currentCanvas.canvas.toDataURL();

  let img = document.createElement("img");
  img.classList.add("memory");
  img.src = url;
  img.width = width;
  img.heigh = height;
  img.title = currentScore;

  document.getElementById("best").innerHTML = "";
  document.getElementById("best").appendChild(img.cloneNode());

  img.width = width / 2;
  img.height = height / 2;

  memory.insertBefore(img, memory.firstChild);

  if (memory.childNodes.length > memory.dataset.maxItems) {
    memory.removeChild(memory.lastChild);
  }
}

let mutationCount = 0;

function draw() {
  
  if(!currentDesign) {
    return;
  }
  randomSeed(mutationCount++);
  currentDesign = JSON.parse(JSON.stringify(bestDesign));
  rate.innerHTML = slider.value;
  p4_mutate(currentDesign, currentInspiration, slider.value/100.0);
  
  randomSeed(0);
  p4_render(currentDesign, currentInspiration);
  let nextScore = evaluate();
  activeScore.innerHTML = nextScore;
  if (nextScore > currentScore) {
    currentScore = nextScore;
    bestDesign = currentDesign;
    memorialize();
    bestScore.innerHTML = currentScore;
  }
  
  fpsCounter.innerHTML = Math.round(frameRate());
}