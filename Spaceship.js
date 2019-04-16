class Spaceship {
  constructor () {
      this.location = createVector(width/2, height/2)
      this.velocity = createVector(0, 0)
      this.acceleration = createVector(0, 0)
      this.direction = createVector(1, 0)
      this.projectiles = []
      this.exhausted = []
      this.cooldown = 0
  }

  update() {
    this.velocity.limit(3)
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)

    if (this.cooldown > 0) { this.cooldown-- }

    this.projectiles.forEach(projectile => {
      projectile.display()
      projectile.update()
    })
    if (this.projectiles.length != 0 && this.projectiles[0].offScreenCheck())
      this.projectiles.shift()

    this.exhausted.forEach(exhaust => {
      exhaust.display()
      exhaust.update()
    })
    while (this.exhausted.length > 0 && this.exhausted[0].faded()) {
      this.exhausted.shift()
    }
  }

  display() {
    fill(255)
    stroke(255)
    push()
    translate(this.location.x, this.location.y)
    rotate(this.direction.heading())
    triangle(6,0,-2,4,-2,-4)
    pop()
  }

  boost() {
    this.velocity.add(p5.Vector.mult(ship.direction, .05))
    for (let i = random(3, 10); i > 0; i--) {
      this.exhausted.push(new Exhaust(createVector(this.location.x, this.location.y),
                                      createVector(-this.direction.x, -this.direction.y )))
    }
  }

  turnRight() { ship.direction.rotate(.15) }

  turnLeft() { ship.direction.rotate(-.15) }

  shoot() {
    if (this.cooldown == 0) {
      this.projectiles.push(new Projectile(createVector(this.location.x, this.location.y),
                                            this.direction.copy().mult(4)))
      this.cooldown = 30
    }
  }
}
