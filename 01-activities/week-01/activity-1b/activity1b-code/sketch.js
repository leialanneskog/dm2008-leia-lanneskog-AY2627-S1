// DM2008 — Activity 1b [Georg Nees]
// Learning By Making (30 min)

let x;
let y;
let w;
let r;
let g;
let b;

function setup() {
  createCanvas(800, 800)
  background(240);
  rectMode(CENTER);
}

function draw() {
  
  x = random(width);
  y = random(height);
  w = random(10, 80);
  r = random(255);
  g = random(255);
  b = random(255);
  
  background(240,1);
  
  stroke(r, g, b);
  strokeWeight(random(0.5, 2));
  fill(r, g, b, random(255));
  //rect(x, y, w, w);
  rect(mouseX, mouseY, w);
}

function keyPressed() {
    saveCanvas("activity1b-image", "jpg");
}