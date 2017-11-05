class Particle {
  constructor (x, y) {
    this.pos = createVector(x,y)
    this.vel = createVector(0,0)
    this.acc = createVector(0,0)

    this.maxspeed = 4
    this.color = 0

    this.colorDir = 1

    this.prevPos = this.pos.copy()
  }

  update () {
    this.vel.add(this.acc)
    this.vel.limit(this.maxspeed)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  updatePrev () {
    this.prevPos = this.pos.copy()
  }

  follow(field) {
    let x = floor(this.pos.x / scl)
    let y = floor(this.pos.y / scl)

    let index = x + y * cols

    let force = field[index]

    this.acc.add(force)
  }

  show () {
    stroke(100, 0, 0, this.color)
    strokeWeight(1)

    this.color += this.colorDir

    if (this.color > 255) this.colorDir = -1
    if (this.color < 0) this.colorDir = 1

    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)

    this.updatePrev()
  }

  edges () {
    if(this.pos.x > width) {
      this.pos.x = 0
      this.updatePrev()
    } else if (this.pos.x < 0) {
      this.pos.x = width
      this.updatePrev()
    }

    if(this.pos.y > height) {
      this.pos.y = 0
      this.updatePrev()
    } else if (this.pos.y < 0) {
      this.pos.y = height
      this.updatePrev()
    }
  }
}
