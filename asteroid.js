class Asteroid extends Projectile {
  constructor() {
    super(location, direction)
    this.color = color(random(10, 240), random(10, 240), random(10, 240))
  }

  display() {
    
  }

}
