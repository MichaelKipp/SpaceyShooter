class Projectile {
  constructor (location, direction) {
    this.location = location
    this.velocity = direction
    this.color = color(random(50, 240), random(50, 240), random(50, 240))
    this.exploded = false
    this.dead = false
    this.sparks = []
  }

  update() {
    this.location.add(this.velocity)
  }

  display() {
    if (!this.exploded) {
      push()
      fill(this.color)
      point(this.location.x, this.location.y)
      pop()
    } else {
      this.sparks.forEach(spark => {
        spark.display()
        spark.update()
      })
      while (this.sparks.length > 0 && this.sparks[0].faded()) {
        this.sparks.shift()
      }
      if (this.sparks.length == 0 && this.exploded) {
        this.dead = true
      }
    }
  }

  offScreenCheck() {
    return this.location.x > width || this.location.x < 0 || this.location.y > height || this.location.y < 0
  }

  explode() {
    if (this.exploded == false) {
      for (var i = 0; i < 20; i++) {
        this.sparks.push(new Exhaust(this.location.copy(), createVector(random(-1, 1), random(1, -1))))
      }
      this.exploded = true
    }
  }
}
