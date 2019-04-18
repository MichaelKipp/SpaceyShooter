class Spaceship {
  constructor () {
      this.location = createVector(width/2, height/2)
      this.velocity = createVector(0, 0)
      this.acceleration = createVector(0, 0)
      this.direction = createVector(1, 0)
      this.projectiles = []
      this.exhausted = []
      this.cooldown = 0
      this.booster = 100
      this.boostCooldown = 0
  }

  update() {
    this.velocity.add(this.acceleration)
    this.velocity.limit(5)
    this.location.add(this.velocity)

    if (this.cooldown > 0) { this.cooldown-- }

    if (this.booster <= 0 && this.boostCooldown <= 1) {
      this.booster = 100
    } else if (this.booster < 100 && this.boostCooldown == 0) {
      this.booster++
    } else if (this.boostCooldown > 0) {
      this.boostCooldown--
    }

    if (this.location.x < 0) {
      this.location.x = width
    }
    if (this.location.x > width) {
      this.location.x = 0
    }
    if (this.location.y < 0) {
      this.location.y = height
    }
    if (this.location.y > height) {
      this.location.y = 0
    }

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
    for (var i = this.projectiles.length - 1; i >= 0; i--) {
      for (var j = asteroids.length - 1; j >= 0; j--) {
        if (asteroids[j].impacts(this.projectiles[i].location.x, this.projectiles[i].location.y)) {
          if (!this.projectiles[i].exploded) {
            this.projectiles[i].explode()
            // asteroids.push(asteroids[j].shatter())
            // asteroids.push(asteroids[j].shatter())
            asteroids.splice(j, 1)
          }
        }
      }
      if (this.projectiles[i].dead) { this.projectiles.splice(i, 1) }
    }
  }

  display() {
    push()
    fill(255)
    stroke(255)
    translate(this.location.x, this.location.y)
    rotate(this.direction.heading())
    triangle(6,0,-2,4,-2,-4)
    pop()
  }

  boost(multiplier) {
    this.velocity.add(p5.Vector.mult(ship.direction, multiplier))
    if (multiplier == .05 || this.boostCooldown > 0) {
      for (let i = random(3, 10); i > 0; i--) {
        this.exhausted.push(new Exhaust(this.location,
                                          createVector(-this.direction.x, -this.direction.y),
                                          color(0, random(50, 255), random(50, 255), this.power)))
      }
    } else {
      this.booster -= 2
      if (this.booster <= 0) {this.boostCooldown = 200}
      for (let i = random(6, 15); i > 0; i--) {
        this.exhausted.push(new Exhaust(this.location,
                                          createVector(-this.direction.x*2, -this.direction.y*2),
                                          color(random(50, 255), 0, random(50, 255), this.power)))
      }
    }
  }

  turnRight() { ship.direction.rotate(.15) }

  turnLeft() { ship.direction.rotate(-.15) }

  shoot() {
    if (this.cooldown == 0) {
      this.projectiles.push(new Projectile(this.location,
                                            this.velocity.copy().add(this.direction.copy().mult(4))))
      this.cooldown = 30
    }
  }
}
