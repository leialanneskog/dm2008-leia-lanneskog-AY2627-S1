let colorBtn, addBtn, removeBtn, sizeSlider, shapeSelect;
let shapeColor;

// Array to store shapes
let shapes = [];

function setup() {
  createCanvas(640, 400);
  noStroke();
  textFont("Helvetica, Arial, sans-serif");

  // starting color
  shapeColor = color(random(255), random(255), random(255));

  //Add fist shape in array
  shapes.push({
    size: 100,
    col: shapeColor
  })

  // Button: change color
  colorBtn = createButton("Change Color");
  colorBtn.position(16, 16);
  colorBtn.mousePressed(randomShapeColor);

  function randomShapeColor() {
    shapeColor = color(random(255), random(255), random(255));
  }

  // Slider: controls size
  createP("Size").position(0, 50).style("margin", "4px 0 0 16px");
  sizeSlider = createSlider(20, 220, 100, 1);
  sizeSlider.position(15, 70);

  // Dropdown: choose shape
  createP("Shape").position(0, 100).style("margin", "8px 0 0 16px");
  shapeSelect = createSelect();
  shapeSelect.position(16, 130);
  shapeSelect.option("ellipse");
  shapeSelect.option("rect");
  shapeSelect.option("triangle");

  // Button: add shape
  addBtn = createButton("Add shape");
  addBtn.position(16, 200);
  addBtn.mousePressed(addShape);

  // Button: remove shape
  removeBtn = createButton("Remove shape");
  removeBtn.position(16, 240);
  removeBtn.mousePressed(removeShape);

  // Add a new shape
  function addShape() {
    shapes.push({
      col: color(random(255), random(255), random(255))
    });
  }

  // Remove shape 
  function removeShape() {
    if (shapes.length > 1) {
      shapes.pop();
    }
  }
}

function draw() {
  background(240);

  push();
  //translate(width * 0.65, height * 0.5);
  let s = sizeSlider.value();

  let spacing = (width * 0.65) / (shapes.length + 1);

  // Draw all shapes
  for (let i = 0; i < shapes.length; i++) {
    let x = width * 0.65 + (i - (shapes.length - 1) / 2) * spacing;
    let y = height * 0.5;

    fill(
      red(shapeColor) + i * 10,
      green(shapeColor) + i * 10,
      blue(shapeColor) + i * 10
    );
    stroke(240);

    // Draw chosen shape
    let choice = shapeSelect.value();
    if (choice === "ellipse") {
      ellipse(x, y, s, s);
    } else if (choice === "rect") {
      rectMode(CENTER);
      rect(x, y, s, s);
    } else if (choice === "triangle") {
      triangle(x - s * 0.6, y + s * 0.5, x, y - s * 0.6,x + s * 0.6,y + s * 0.5);
    }
  }
  pop();
}
