class Projectile {
  constructor (location, direction) {
    this.location = location
    this.velocity = direction
    this.color = color(random(50, 240), random(50, 240), random(50, 240))
    console.log(this.location)
  }

  update() {
    this.location.add(this.velocity)
  }

  display() {
    fill(this.color)
    point(this.location.x, this.location.y)
  }

  offScreenCheck() {
    return this.location.x > width || this.location.x < 0 || this.location.y > height || this.location.y < 0
  }
}
