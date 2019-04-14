class Spaceship {
    constructor () {
        this.location = createVector(width/2, height/2)
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.direction = createVector(1, 0)
        this.projectiles = []
    }

    update() {
      this.velocity.add(this.acceleration)
      this.location.add(this.velocity)
      this.projectiles.forEach(projectile => {
        projectile.display()
        projectile.update()
      })
      if (this.projectiles.length != 0 && this.projectiles[0].offScreenCheck())
        this.projectiles.shift()
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

    boost() {
      this.velocity.add(p5.Vector.mult(ship.direction, .05))
      //TODO: shoot particles from butt
    }

    turnRight() { ship.direction.rotate(.15) }

    turnLeft() { ship.direction.rotate(-.15) }

    shoot() {
      this.projectiles.push(new Projectile(createVector(this.location.x, this.location.y),
                                            createVector(this.direction.x, this.direction.y)))
    }
}
