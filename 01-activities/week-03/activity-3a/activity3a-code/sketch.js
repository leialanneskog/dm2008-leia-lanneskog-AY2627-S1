// DM2008 — Activity 3a [Guided]
// Array Sampler (25 min)
//
// An array stores a list of values — here it's colors, but it could be
// sizes, positions, or anything else.
// Press any key to cycle through the array one item at a time.
//
// Try these:
// - Replace the colors with your own values (sizes, positions, text).
// - Use mousePressed() instead of keyPressed().
// - Use push() to add new items or splice() to remove them.
// - Loop through the whole array to draw all items at once.
//
// Stretch: visualize all items in the array simultaneously instead of one at a time.

let palette = ["#f06449", "#009988", "#3c78d8", "#ffeb3b"];
size = [40, 60, 80];
let currentIndex = 0;

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(220);

    // Even spacing based on how many items are in the array
    const spacing = width / (size.length + 1);
    // Draw one circle for each palette color
    for (let i = 0; i < size.length; i++) {
      fill(palette[i]);                   // use the i-th color
      const x = (i + 1) * spacing;        // position from the loop index
      ellipse(x, height / 2, size[currentIndex]);
  }

  // Draw the ellipse using the current color in the array
  //fill(255, 50, 50);
  //ellipse(width / 2, height / 2, size[currentIndex]);
}

// Advance to the next color each time a key is pressed
function mousePressed() {
  currentIndex++; // shorthand for currentIndex += 1

  // Wrap back to the start when we reach the end
  if (currentIndex >= size.length) {
    currentIndex = 0;
  }

  console.log("Current index:", currentIndex, "→", size[currentIndex]);
  console.log(size);
}

// Try changing the array while the loop keeps adapting
function keyPressed() {
  if (key == 'a' || key == 'A') {
    // Add a new random color to the end
    size.push(size[size.length-1] + 20);
    palette.push(color(random(255), random(255), random(255)));
  }
  if (key == 'r' || key == 'R' ) {
    // Remove the last color (if any)
    if (size.length > 0) {
      size.splice(size.length - 1, 1);
    }
  }
}

