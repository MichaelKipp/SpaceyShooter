class Exhaust {
  constructor(location, direction, color) {
    this.location = location
    this.velocity = direction.rotate(random(-1, 1))
    this.velocity = this.velocity.mult(.5)
    this.color = color
    this.power = 255
  }

  display() {
    push()
    fill(this.color)
    stroke(this.color)
    ellipse(this.location.x, this.location.y, random(.01, 1.5))
    pop()
  }

  update() {
    this.location.add(this.velocity)
    this.power -= 4
    this.color.setAlpha(this.power)
  }

  faded() {
    return this.power <= 0
  }
}
