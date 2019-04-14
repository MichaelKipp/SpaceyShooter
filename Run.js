/*  Author: Michael Kipp
    Project: Asteroids(ish) Replica
    Date: 04/13/2019
*/

var ship

function setup() {
    createCanvas(windowWidth, windowHeight)
    // rectMode(CENTER)
    width = windowWidth
    height = windowHeight

    smooth()
    angleMode(RADIANS)
    ship = new Spaceship()
  }

  function draw() {
    background(0)

    checkAcceleration()

    ship.update()
    ship.display()
  }

  function checkAcceleration() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { ship.direction.rotate(-.15) }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { ship.direction.rotate(.15) }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { ship.accelerate(p5.Vector.mult(ship.direction, .05)) }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { ship.accelerate(p5.Vector.mult(ship.direction, -.05)) }
    if (keyIsDown(32)) { ship.shoot() }
  }

  function windowResized() { resizeCanvas(windowWidth, windowHeight) }
