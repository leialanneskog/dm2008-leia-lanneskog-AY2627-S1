// DM2008 — Activity 2b [Guided]
// Pattern Making (40 min)
//
// Use a for loop to draw a repeating row of shapes.
// Add a condition to introduce variation — alternating color, size, or spacing.
// Then add one interaction (mouse or key) that changes the rule.
//
// Stretch: try a second row, or turn your row into a 2D grid.

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);

  for (let i = 0; i < width; i += 50) {
    // % (modulo) alternates between 0 and non-zero — good for switching every other shape
    if (mouseIsPressed && i % 100 == 0) {
      fill(255, 50, 50);
    } else if (mouseIsPressed && i % 100 != 0) {
      fill(50, 50, 255);
    } else if (i % 100 == 0) {
      fill(0);
    } else {
      fill(180);
    }

    // --- Your shape goes here ---
    // Try swapping this out for your own rule.
    for (let y = 50; y < height; y += 50)
      if (y % 100 == 0) {
        ellipse(i + 25, y, 40);
      }
    else {
      ellipse(25, y, 40);
      ellipse(i + 75, y, 40);
    }
  }
    
}