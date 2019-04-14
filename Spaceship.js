class Spaceship {
    constructor () {
        this.location = createVector(width/2, height/2)
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.direction = createVector(1, 0)
    }

    update() {
      this.velocity.add(this.acceleration)
      this.location.add(this.velocity)

    }

    display() {
      fill(255)
      stroke(255)
      push()
      translate(this.location.x, this.location.y)
      rotate(this.direction.heading())
      triangle(6,0,-2,4,-2,-4)
      pop()
    }

    accelerate(vector) {
      this.velocity.add(vector)
    }

    shoot() {

    }
}
