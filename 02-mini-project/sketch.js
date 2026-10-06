// DM2008 — Mini Project
// FLAPPY BIRD (Starter Scaffold)
//
// Complete this scaffold into a playable game.
// Your game should have player control, collision detection,
// score tracking, and at least two game states.
//
// Not sure where to start? Try this order:
// 1. Get the bird flapping — add control in keyPressed()
// 2. Get pipes spawning — uncomment the spawn logic in draw()
// 3. Add collision detection between the bird and pipes
// 4. Add scoring when the bird passes a pipe
// 5. Add game states — at minimum a playing state and a game over state
//
// Stretch: add a start screen, a high score, or a difficulty curve.

/* ----------------- Globals ----------------- */
let bird;
let pipes = [];
let score = 0;
let spawnCounter = 0;

let imgBackground, imgPipeBody, imgPipeTop, imgPipeBottom, imgBird;
let scoreSound, gameOverSound;

const SPAWN_RATE = 90;
const PIPE_SPEED = 2.5;
const PIPE_GAP = 120;
const PIPE_W = 60;

// Game states: "start", "playing" or "gameover"
let gameState = "start";

/* ----------------- Setup & Draw ----------------- */
async function setup() {
  createCanvas(480, 640);
  
  imgBackground = await loadImage("assets/background.png");
  imgPipeBody = await loadImage("assets/pipe-body.png");
  imgPipeTop = await loadImage("assets/pipe-head-top.png");
  imgPipeBottom = await loadImage("assets/pipe-head-bottom.png");
  imgBird = await loadImage("assets/bird.png")
  
  scoreSound = await loadSound("assets/score-sound.mp3");
  gameOverSound = await loadSound("assets/game-over-sound.mp3");
  
  noStroke();
  bird = new Bird(120, height / 2);
  pipes.push(new Pipe(width + 40));  

}

function draw() {
  background(18, 22, 28);

  if (gameState === "start") {
    image(imgBackground, 0, 0, 480, 640);
    textSize(48);
    textAlign(CENTER, CENTER);
    fill(18, 22, 28);
    text("START GAME", width/2, height/3);

    // imgaeMode(CENTER) is only applied on imgBird
    push();
    imageMode(CENTER);
    image(imgBird, width/2, height/2.2, 40, 32);
    pop(); 
    
    // How do they start?
    textSize(18);
    text("Click on the screen to start the game!", width/2, height/1.6);  
  }

  if (gameState === "playing") {
    image(imgBackground, 0, 0, 480, 640);
    bird.update();

    // Spawn a new pipe every SPAWN_RATE frames, then reset the counter
    spawnCounter++;
    if (spawnCounter >= SPAWN_RATE) {
       pipes.push(new Pipe(width + 40));
       spawnCounter = 0;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      // When the bird hits a pipe, trigger game over
      if (pipes[i].hits(bird)) {
        gameState = "gameover";
        gameOverSound.play();
      }

      // When the bird passes a pipe, increment the score
      // Hint: use pipes[i].passed to make sure you only score once per pipe
      if (!pipes[i].passed && pipes[i].x + pipes[i].w < bird.pos.x) {
        // increment score here
        pipes[i].passed = true;
        score += 1;
        scoreSound.play();
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    bird.show();

    // Display the score — look up textAlign() and textSize() in the p5.js reference
    textSize(28);
    textAlign(CENTER, CENTER);
    fill(255);
    text("Score: " + score, 70, 40);
  }

  if (gameState === "gameover") {
    // What should the player see when the game ends?
    textSize(48);
    textAlign(CENTER, CENTER);
    fill(255);
    text("GAME OVER", width/2, height/3);

    textSize(28);
    text("Score: " + score, width/2, height/2.4);
    
    // How do they restart?
    textSize(18);
    text("Press 'R' to Restart!", width/2, height/1.6);
    }
  }

// Restart function, resets everything.
function restart() {
  pipes = [];
  score = 0;
  spawnCounter = 0;
  bird = new Bird(120, height / 2);
  pipes.push(new Pipe(width + 40));
  gameState = "playing"
}

/* ----------------- Input ----------------- */
function keyPressed() {
  // Make the bird flap on space or UP_ARROW — call bird.flap()
  if (key === UP_ARROW || key === ' ') {
      bird.flap();
    }
  
  // Restart the game when r is pressed - call restart()
  if (gameState === "gameover") {
    if (key === 'r' || key === 'R') {
      restart();
      }
    }
  }

// Starts game on click
function mousePressed() {
  if (gameState === "start") {
    gameState = "playing";
    }
  }

/* ----------------- Classes ----------------- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16;
    this.gravity = 0.45;
    this.flapStrength = -8.0;
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    // A negative y velocity moves the bird upward
    this.vel.y = this.flapStrength;
  }

  update() {
    this.applyForce(this.gravity);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Keep the bird within the canvas vertically
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
    }

    // Touching the ground is game over — same as hitting a pipe
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y = 0;
      gameState = "gameover";
      gameOverSound.play();
    }
  }

  // imgaeMode(CENTER) is only applied on imgBird
  show() {
    push();
    imageMode(CENTER);
    image(imgBird, this.pos.x, this.pos.y, 40, this.r * 2);
    pop();
  }
}

class Pipe {
  constructor(x) {
    this.x = x;
    this.w = PIPE_W;
    this.speed = PIPE_SPEED;

    const margin = 40;
    const gapY = random(margin, height - margin - PIPE_GAP);
    this.top = gapY;
    this.bottom = gapY + PIPE_GAP;

    this.passed = false;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    // Top pipe body
    image(imgPipeBody, this.x, 0, this.w, this.top);

    // Top pipe head
    image(imgPipeTop, this.x - 5, this.top - 30, this.w + 10, 30);

    // Bottom pipe body
    image(imgPipeBody, this.x, this.bottom, this.w, height - this.bottom);

    // Bottom pipe head
    image(imgPipeBottom, this.x - 5, this.bottom, this.w + 10, 30);
  }

  offscreen() {
    // 'return' sends a value back to wherever this method was called
    // We'll cover this properly next week, for now just know it gives back true or false
    return this.x + this.w < 0;
  }

  // Checks if the bird overlaps with either pipe rectangle
  // 1) Is the bird within the pipe's x range?
  // 2) If yes, is it outside the gap — above the top or below the bottom?
  hits(bird) {
    // This method also uses 'return' — coming up next week!
    const withinX = (bird.pos.x + bird.r > this.x) && (bird.pos.x - bird.r < this.x + this.w);
    const aboveGap = bird.pos.y - bird.r < this.top;
    const belowGap = bird.pos.y + bird.r > this.bottom;
    return withinX && (aboveGap || belowGap);
  }
}