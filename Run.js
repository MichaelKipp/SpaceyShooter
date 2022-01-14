/*  Author: Michael Kipp
    Project: Asteroids(ish) Replica
    Date: 04/13/2019
*/

var ship
var asteroids
var startX
var startY
var lives
var score
var level
var oneUpped
var advancing

var myFont

var bangLarge
var bangMedium
var bangSmall
var beat1
var beat2
var extraship
var fire
var saucerBig
var saucerSmall
var thrust

var hasMoved
var hasShot

function preload() {
  myFont = loadFont('Hyperspace.otf');
  soundFormats('wav');
  bangLarge = loadSound('Sounds/bangLarge.wav');
  bangMedium = loadSound('Sounds/bangMedium.wav');
  bangSmall = loadSound('Sounds/bangSmall.wav');
  beat1 = loadSound('Sounds/beat1.wav');
  beat2 = loadSound('Sounds/beat2.wav');
  extraship = loadSound('Sounds/extraShip.wav');
  fire = loadSound('Sounds/fire.wav');
  saucerBig = loadSound('Sounds/saucerBig.wav');
  saucerSmall = loadSound('Sounds/saucerSmall.wav');
  thrust = loadSound('Sounds/thrust.wav');
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    // rectMode(CENTER)
    width = windowWidth
    height = windowHeight

    smooth()
    angleMode(RADIANS)
    colorMode(RGB, 255)

    asteroids = []

    startX = []
    startY = []

    for (var x = 0; x < width; x++) {
      if (x > width/2 + 100 || x < width/2 - 100) {
        startX[x] = x
      }
    }

    for (var y = 0; y < height; y++) {
      if (y > height/2 + 100 || y < height/2 - 100) {
        startY[y] = y
      }
    }

    oneUpped = true
    start()
  }

  function draw() {
    background(0)

    //score
    if (asteroids.length == 0 && !advancing) {
      advanceLevel()
    }

    if (lives <= 0) {
      gameOver()
    }

    if (score % 10000 == 0 && !oneUpped) {
      extraship.play()
      lives++
      oneUpped = true
    }

    checkInteraction()

    asteroids.forEach(asteroid => {
      asteroid.update()
      asteroid.display()
    })


    push()
    translate(100,50)
    textSize(40)
    fill(255)
    textFont(myFont)
    text(score, -10, 0)
    translate(width - 100, 0)
    pop()

    push()
    translate(width/2,50)
    textSize(40)
    fill(255)
    textFont(myFont)
    text(level, -10, 0)
    pop()

    //lives
    push()
    translate(100, 70)
    if (lives > 0) {
      for (var i = 0; i < lives; i++) {
        beginShape();
        vertex(0, 0)
        vertex(-6, -2)
        vertex(0, 10)
        vertex(6, -2)
        endShape(CLOSE)
        translate(20, 0)
      }
    pop()
    ship.update()
    ship.display()
    if (!hasMoved){
      fill(200, .75);
      text("W, A, D or arrow keys to move", (windowWidth * 11/20), (windowHeight/2));
    }
    if (!hasShot){
      fill(200, 1);
      text("Space to shoot", (windowWidth * 11/20), (windowHeight/2) + 20);
    }
  }
}

  function start() {
    ship = new Spaceship()
    asteroids = []
    advancing = false
    lives = 3
    score = 0
    level = 1
    spawnAsteroids()
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  async function advanceLevel() {
    level++
    advancing = true
    await sleep(2000)
    spawnAsteroids()
    advancing = false
  }

  function spawnAsteroids() {
    for (var i = 0; i < 5 + level/2; i++) {
      asteroids.push(new Asteroid(createVector(random(startX), random(startY)), createVector(random(0, 1), random(0, 1)), 30))
    }
  }

  function gameOver() {
    push()
    fill(255)
    translate(width/2, height/2)
    textAlign(CENTER, CENTER)
    textFont(myFont)
    textSize(100)
    text('GAME OVER', 0, 0)
    translate(0, 100)
    textSize(35)
    if (frameCount % 40 > 20) {
      stroke(0)
      fill(0)
    }
    text('PRESS <ENTER> TO START', 0, 0)
    pop()
  }

  function keyPressed() {
    if (keyCode == 32) {
      ship.shoot()
      hasShot = true;
    }
  }

  function checkInteraction() {
    if (keyIsDown(ENTER)) {
      if (lives <= 0) {
          start()
      }
    }
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { ship.turnLeft() }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { ship.turnRight() }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      hasMoved = true;
      if (keyIsDown(SHIFT)) {
        ship.boost(.2)
      } else {
        ship.boost(.05)
      }
    }
    // if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { ship.accelerate(p5.Vector.mult(ship.direction, -.05)) }
    // if (keyIsDown(32)) {  }
  }

  function windowResized() { resizeCanvas(windowWidth, windowHeight) }
