class Projectile {
  constructor (location, direction) {
    this.location = location
    this.velocity = direction
    this.acceleration = createVector(0, 0)
    this.color (random(50, 240), random(50, 240), random(50, 240))
  }

  update() {
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
  }

  display() {
    fill(this.color)
    point(this.location)
  }
}
