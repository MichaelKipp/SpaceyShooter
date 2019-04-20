class Spaceship {
  constructor () {
      this.location = createVector(width/2, height/2)
      this.velocity = createVector(0, 0)
      this.acceleration = createVector(0, 0)
      this.direction = createVector(1, 0)
      this.projectiles = []
      this.exhausted = []

      this.poly = [createVector(0, 0),
      createVector(-2, -6),
      createVector(10, 0),
      createVector(-2, 6),]

      this.cooldown = 0
      this.booster = 100
      this.boostCooldown = 0
      this.invulnerability = 0
  }

  update() {
    this.velocity.add(this.acceleration)
    this.velocity.limit(3)
    this.location.add(this.velocity)

    if (this.invulnerability > 0) { this.invulnerability-- }

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
    for (var j = asteroids.length - 1; j >= 0; j--) {
      if (this.collidesWithAsteroid(asteroids[j]) && this.invulnerability == 0) {
        this.collision()
      }
      for (var i = this.projectiles.length - 1; i >= 0; i--) {
        if (asteroids[j].impacts(this.projectiles[i].location.x, this.projectiles[i].location.y)) {
          if (!this.projectiles[i].exploded) {
            score += 10
            this.projectiles[i].explode()
            if (asteroids[j].size >= 20) {
              for (var k = 0; k < 2; k++) {
                asteroids.push(asteroids[j].shatter())
              }
            }
            asteroids.splice(j, 1)
            break;
          }
        }
        if (this.projectiles[i].dead) { this.projectiles.splice(i, 1) }
      }
    }
  }

  display() {
    push()
    if (this.invulnerability % 10 > 5) {
      fill(0)
      stroke(100)
    } else {
      fill(0)
      stroke(255)
    }
    translate(this.location.x, this.location.y)
    rotate(this.direction.heading())
    beginShape();
    vertex(0, 0)
    vertex(-2, -6)
    vertex(10, 0)
    vertex(-2, 6)
    endShape(CLOSE)
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

  collision() {
    lives--
    this.spawn(createVector(width/2, height/2))
  }

  spawn(location) {
    this.invulnerability = 200
    this.location = location
    this.velocity = createVector(0, 0)
    for (var i = 0; i < 40; i++) {
      this.exhausted.push(new Exhaust(this.location,
                                      createVector(random(-5, 5), random(-5, 1)),
                                      color(255, 255, 255)))
    }
  }

  collidesWithAsteroid(asteroid) {
    return dist(this.location.x, this.location.y, asteroid.location.x, asteroid.location.y) < asteroid.size + 10
  }

  turnRight() { ship.direction.rotate(.1) }

  turnLeft() { ship.direction.rotate(-.1) }

  shoot() {
    if (this.cooldown == 0) {
      this.projectiles.push(new Projectile(this.location,
                                            this.velocity.copy().add(this.direction.copy().mult(4))))
      this.cooldown = 30
    }
  }
}
