class Saucer extends Projectile {
  constructor(location, direction, size) {
    super(location, direction)
    this.size = size()
  }
}
