class Asteroid extends Projectile {
  constructor(location, direction, size) {
    super(location, direction)
    // this.color = color(random(10, 240), random(10, 240), random(10, 240))
    this.size = size
    this.edges = random(9, 13)
    this.poly = []
    for (var i = 0; i < this.edges; i++) {
      var angle = map(i, 0, this.edges, 0, TWO_PI)
      this.poly.push(createVector(this.size * cos(angle) + random(-4, 4),
                                  this.size * sin(angle) +  random(-4, 4)))
    }
  }

  display() {
    stroke(255)
    fill(0)
    push()
    translate(this.location.x, this.location.y)
    beginShape()
    this.poly.forEach(vert => {
      vertex(vert.x, vert.y)
    })
    endShape(CLOSE)
    pop()
  }

  update() {
    this.location.add(this.velocity.copy().mult(1 + level/10))
    if (this.location.x + this.size < 0) {
      this.location.x = width + this.size
    }
    if (this.location.x - this.size > width) {
      this.location.x = -this.size
    }
    if (this.location.y + this.size < 0) {
      this.location.y = height + this.size
    }
    if (this.location.y - this.size > height) {
      this.location.y = -this.size
    }
  }

  impacts(x, y) {
    return dist(x, y, this.location.x, this.location.y) < this.size
  }

  shatter() {
    return (new Asteroid(this.location,
                          createVector(random(-1, 1), random(-1, 1)),
                          this.size - 10))
  }
}
