class Exhaust {
  constructor(location, direction) {
    this.location = location
    this.velocity = direction.rotate(random(-1, 1))
    this.velocity = this.velocity.mult(.5)
    this.color = color(255, random(0, 255), 0, this.power)
    this.power = 255
  }

  display() {
    fill(this.color)
    stroke(this.color)
    ellipse(this.location.x, this.location.y, random(.01, 1.5))
  }

  update() {
    this.location.add(this.velocity)
    this.power -= 4
    this.color = color(255, random(0, 150), 0, this.power)
  }

  faded() {
    return this.power <= 0
  }
}
