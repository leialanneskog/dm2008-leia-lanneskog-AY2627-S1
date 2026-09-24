// DM2008 — Activity 1a
// Simple Creatures (20 min)

// Run the sketch, then click on the preview to enable keyboard
// Use the 'Option' ('Alt' on Windows) key to view or hide the grid
// Use the 'Shift' key to change overlays between black & white
// Write the code for your creature within the space provided

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("#ffe5ee");
  // YOUR CODE HERE
  fill(20);
  rect(250,200,50);

  rect(150,200,50);

  rect(100,150,200,50);

  triangle(150, 150, 100, 200, 100, 100);
  //triangle(200, 150, 150, 250, 100, 100);
  fill(255);
  ellipse(200, 200, 10, 10);
  // YOUR CODE HERE
  
  helperGrid(); // do not edit or remove this line
}
