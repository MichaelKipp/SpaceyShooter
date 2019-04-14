/*  Author: Michael Kipp
    Project: Asteroids Replica
    Date: 04/13/2019
*/

var ship

function setup() {
    createCanvas(windowWidth, windowHeight)
    width = windowWidth
    height = windowHeight

    smooth()
    ship = new Spaceship(createVector(200, 200))
  }

  function draw() {
    background(0)

    checkAcceleration()

    ship.update()
    ship.display()
  }

  function checkAcceleration() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { ship.accelerate(createVector(-1, 0)) }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { ship.accelerate(createVector(1, 0)) }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { ship.accelerate(createVector(0, -1)) }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { ship.accelerate(createVector(0, 1)) }
  }

  function keyPressed() {
      console.log(keyCode)
      switch(keyCode) {
          case 32:
              ship.shoot()//w
              break
      }
  }

  function windowResized() { resizeCanvas(windowWidth, windowHeight) }
