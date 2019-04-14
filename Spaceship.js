class Spaceship {
    constructor (location) {
        this.location = location
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.direction
    }

    update() {
      this.velocity.add(this.acceleration)
      this.location.add(this.velocity)
    }

    display() {
        fill(255)
        rect(this.location.x, this.location.y, 5, 5)
    }

    accelerate(vector) {
      this.velocity.add(vector)
    }

    shoot() {

    }
}
