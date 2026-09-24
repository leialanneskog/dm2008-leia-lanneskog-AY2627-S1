// DM2008 — Activity 4a [Guided]
// Bake a Cookie (30 min)
//
// A class is a blueprint — Cookie describes what every cookie has and can do.
// Your job is to complete the class, then add movement and a flavor randomizer.
//
// Suggested order:
// 1. Add the missing properties to the constructor (sz, x, y)
// 2. Fix show() so it uses this.flavor, this.x, this.y, this.sz
// 3. Implement move() and randomFlavor()
// 4. Wire them up in keyPressed() and mousePressed()
//
// Stretch: add a second cookie with different starting values.

let cookie;
let flavorList = ["chocolate", "vanilla", "strawberry"];

function setup() {
  createCanvas(400, 400);
  noStroke();
  cookie = new Cookie("chocolate", 80, width / 2, height / 2);
}

function draw() {
  background(230);
  cookie.show();
}

class Cookie {
  constructor(flavor, sz, x, y) {
    // this. binds each value to this specific cookie object
    // Add the missing properties below
    this.flavor = flavor;
    this.sz = sz;
    this.x = x;
    this.y = y;
  }

  show() {
    // Fix this method — it should use this.flavor, this.x, this.y, this.sz
    switch (this.flavor) {
      case "chocolate":
        fill("#673e04");
        break;
      case "vanilla":
        fill("#ffe9a8");
        break;
      case "strawberry":
        fill("#f486a7");
        break;
      default:
        fill(220, 180, 120);
    }
    ellipse(this.x, this.y, this.sz);
  }

  // Add a move() method — update this.x or this.y based on which key is pressed
  move() {
    if (key === LEFT_ARROW) {
      this.x = this.x - 20;
    }
    if (key === RIGHT_ARROW) {
      this.x = this.x + 20;
    }
    if (key === UP_ARROW) {
      this.y = this.y - 20;
    }
    if (key === DOWN_ARROW) {
      this.y = this.y + 20;
    }
  }

  // Add a randomFlavor() method — set this.flavor to one of at least 3 options
  randomFlavor() {
    this.flavor = random(flavorList);
    console.log(this.flavor);
  }
}

// Call cookie.move() when an arrow key is pressed
function keyPressed() {
  if (key === LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW) {
    cookie.move();
  }

}

// Call cookie.randomFlavor() when the mouse is clicked
function mousePressed() {
  cookie.randomFlavor()
}