
//Reference for the code:

//Flow Field Animated by devalladares:
//https://editor.p5js.org/devalladares/sketches/I6lV4tmaP 

/* ----------------- Globals ----------------- */
// Control panel elements
let controlPanel;
let environmentSelect, numSlider, noiseSlider, sizeSlider, speedSlider;

// Background sounds
let spaceSound, osceanSound, sunriseSound;

// Particles colors
let spacePalette = ["#FFFFFF", "#E8DFFF", "#C9B6FF", "#a8a0d7", "#F3C8FF"];
let oceanPalette = ["#438fe1", "#8cecff", "#265ca7", "#0e3783", "#8bbfff"];
let sunrisePalette = ["#ffa061", "#F5D68C", "#D9B56B", "#ffd139", "#ff9a56"];
let currentPalette = spacePalette;

// Mouse attraction and repulsion
let mouseRadius = 200;
let mouseStrength = 3;
let mouseMode = "attract";
let mouseModeLabel;

// Particles start variables 
var num = 1500;
var noiseStrength = 1;
var particles = [];
var angle = 10

/* ----------------- Setup ----------------- */
async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Load sounds
  spaceSound = await loadSound("assets/space.mp3");
  osceanSound = await loadSound("assets/oscean.mp3");
  sunriseSound = await loadSound("assets/sunrise.mp3");

  spaceSound.play();
  spaceSound.loop(true);

  // Create initial particles
  for (let i = 0; i < num; i++) {
    particles[i] = new Particle();
  }

  /* --------------- Control Panel --------------- */
  controlPanel = createDiv();

  controlPanel.position(20, 20);

  controlPanel.style("background", "#000000");
  controlPanel.style("padding", "20px");
  controlPanel.style("color", "white");
  controlPanel.style("font-family", "Arial");
  controlPanel.style("width", "200px");
  controlPanel.style("border-radius", "6px");

  // Dropdown: choose color palette
  createP("Environment")
    .parent(controlPanel)
    .style("margin", "0 0 10px 0")
  
  environmentSelect = createSelect();

  environmentSelect.parent(controlPanel);
  environmentSelect.option("Space");
  environmentSelect.option("Ocean");
  environmentSelect.option("Sunrise");
  // Call changeEnvironment function
  environmentSelect.changed(changeEnvironment);

  environmentSelect.style("background", "#202023");
  environmentSelect.style("color", "white");
  environmentSelect.style("border-radius", "6px");

  // Slider: controls number of particles
  createP("Number of particles")
    .parent(controlPanel)
    .style("margin", "15px 0 10px 0")
  
  numSlider = createSlider(500, 4000, 4000, 100);
  numSlider.parent(controlPanel);
  numSlider.style("width", "100%");
  numSlider.style("accent-color", "#f5f5fb");

  // Slider: controls noice of particles
  createP("Noise of particles")
    .parent(controlPanel)
    .style("margin", "15px 0 10px 0")

  noiseSlider = createSlider(40, 800, 500, 10);
  noiseSlider.parent(controlPanel);
  noiseSlider.style("width", "100%");
  noiseSlider.style("accent-color", "#f5f5fb");

  // Slider: controls size of particles
  createP("Particle size")
    .parent(controlPanel)
    .style("margin", "15px 0 10px 0")

  sizeSlider = createSlider(0.5, 2.5, 0.5, 0.1);
  sizeSlider.parent(controlPanel);
  sizeSlider.style("width", "100%");
  sizeSlider.style("accent-color", "#f5f5fb");

  // Slider: controls particle speed
  createP("Particle Speed")
    .parent(controlPanel)
    .style("margin", "15px 0 10px 0");

  speedSlider = createSlider(0.2, 4, 0.2, 0.1);
  speedSlider.parent(controlPanel);
  speedSlider.style("width", "100%");
  speedSlider.style("accent-color", "#f5f5fb");

  mouseModeLabel = createP("Mouse mode: attract")
  .parent(controlPanel)
  .style("margin", "15px 0 10px 0")
}

// Resize windom
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* ------------------- Draw ------------------- */
function draw() {
  push();
  // Draw transparent background for trails
  fill(0, 20);
  noStroke();
  rect(0, 0, width, height);

  // Get slider value for num
  let targetNum = numSlider.value();

  //Add particles
  while (particles.length < targetNum) {
    particles.push(new Particle());
  }

  // Remove particles
  while (particles.length > targetNum) {
    particles.pop();
  }

  // Run each particle
  for (let i = 0; i < particles.length; i++) {
    particles[i].run();
  }

  mouseModeLabel.html("Mouse mode: " + mouseMode);

  pop();
}

/* --------------- Change Environment Function --------------- */
function changeEnvironment() {
  let environment = environmentSelect.value();

  // Select colors and sound
  if (environment === "Space") {
    currentPalette = spacePalette;
    
    // Default slider values for Space
    numSlider.value(4000);
    noiseSlider.value(500);
    sizeSlider.value(0.5);
    speedSlider.value(0.2);
    
    // Stop previous music
    osceanSound.stop();
    sunriseSound.stop();
    // Play space background music
    spaceSound.play();
    spaceSound.loop(true);

  } else if (environment === "Ocean") {
    currentPalette = oceanPalette;

    // Default slider values for Ocean
    numSlider.value(3000);
    noiseSlider.value(100);
    sizeSlider.value(1.5);
    speedSlider.value(1);

    // Stop previous music
    spaceSound.stop();
    sunriseSound.stop();
    // Play oscean background music
    osceanSound.play();
    osceanSound.loop(true);

  } else if (environment === "Sunrise") {
    currentPalette = sunrisePalette;

    // Default slider values for Sunrise
    numSlider.value(2000);
    noiseSlider.value(400);
    sizeSlider.value(1);
    speedSlider.value(1.5);

    // Stop previous music
    spaceSound.stop();
    osceanSound.stop();
    // Play sunrise background music
    sunriseSound.play();
    sunriseSound.loop(true);
  }
}

/* ------------------- Input ------------------- */
// Mouse repultion and mouse attraction
function mousePressed(event) {
  // Only switch mode when clicking on the canvas
  if (event.target.tagName !== "CANVAS") {
    return;
  }
  if (mouseMode === "attract") {
    mouseMode = "repulse";
  }
  else {
    mouseMode = "attract";
  }
}

/* ----------------- Particles Class ----------------- */
class Particle {
  constructor() {
    // Particle properties
    this.loc = createVector(random(width), random(height));
    this.dir = createVector(cos(angle), sin(angle));
    this.speed = random(0.5, 2)
    this.size = random(1,4);
    this.colorIndex = floor(random(currentPalette.length));
  }

  run() {
    this.move();
    this.mouseInteraction();
    this.checkEdges();
    this.update();
  }

  move() {
    // Get slider value for noise
    let noiseScale = noiseSlider.value();

    // Calculate direction using Perlin noise
    let angle = noise(
      this.loc.x / noiseScale,
      this.loc.y / noiseScale,
      frameCount / noiseScale
    ) * TWO_PI * noiseStrength;

    this.dir.x = cos(angle);
    this.dir.y = sin(angle);

    let vel = this.dir.copy();

    // Apply particle speed and multiply with slider value
    vel.mult(this.speed * speedSlider.value());

    // Update particle position
    this.loc.add(vel);
  }

  mouseInteraction() {
  // Calculate direction from particle to mouse
  let mouse = createVector(mouseX, mouseY);
  let force = p5.Vector.sub(mouse, this.loc);

  // Calculate distance between particle and mouse
  let distance = force.mag();

  // Only affect particles within mouse radius
  if (distance > 0 && distance < mouseRadius) {

    force.normalize();

    // Stronger force closer to mouse
    let strength = map(distance, 0, mouseRadius, mouseStrength, 0);
    force.mult(strength);

    // Attract or repel particles
    if (mouseMode === "attract") {
      this.loc.add(force);
    } else {
      this.loc.sub(force);
    }
  }
}

  checkEdges() {
    // Wrap particles around canvas edges (10px outside the canvas)
    let margin = 10;

    if (this.loc.x > width + margin) {
      this.loc.x = -margin;
    } else if (this.loc.x < -margin) {
      this.loc.x = width + margin;
    }

    if (this.loc.y > height + margin) {
      this.loc.y = -margin;
    } else if (this.loc.y < -margin) {
      this.loc.y = height + margin;
    }
  }

  update() {
    // Apply the color of the particles based on the current color-palette
    fill(currentPalette[this.colorIndex]);
    // Apply particle size and multiply with slider value
    let particleSize = this.size * sizeSlider.value();
    ellipse(this.loc.x, this.loc.y, particleSize);
  }
}
