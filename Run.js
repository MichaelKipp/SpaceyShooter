/*  Author: Michael Kipp
    Project: Asteroids(ish) Replica
    Date: 04/13/2019
*/

var ship
var asteroids

function setup() {
    createCanvas(windowWidth, windowHeight)
    // rectMode(CENTER)
    width = windowWidth
    height = windowHeight

    smooth()
    angleMode(RADIANS)
    colorMode(RGB, 255)

    ship = new Spaceship()
    asteroids = []

    for (var i = 0; i < 10; i++) {
      asteroids.push(new Asteroid(createVector(random(1, 10), random(1, 10)), createVector(random(0, 1), random(0, 1)), 30))
    }
  }

  function draw() {
    background(0)

    checkInteraction()

    ship.update()
    ship.display()

    asteroids.forEach(asteroid => {
      asteroid.update()
      asteroid.display()
    })

  }

  function checkInteraction() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { ship.turnLeft() }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { ship.turnRight() }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      if (keyIsDown(SHIFT)) {
        ship.boost(.2)
      } else {
        ship.boost(.05)
      }
    }
    // if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { ship.accelerate(p5.Vector.mult(ship.direction, -.05)) }
    if (keyIsDown(32)) { ship.shoot() }
  }

  function windowResized() { resizeCanvas(windowWidth, windowHeight) }
