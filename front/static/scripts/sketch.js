'use strict'

let actSec
let timer = 0

const inc = 0.01
const scl = 20
let cols, rows

let zoff = 0

let flowfield
let particles = []

function setup () {
  const canvas = createCanvas(windowWidth, windowHeight)
  canvas.parent('sketch')
  background('white')

  actSec = second()

  cols = floor(width/scl)
  rows = floor(height/scl)

  flowfield = new Array(cols*rows)

  for (let i = 0; i < 300; i++) {
    particles.push(new Particle(random(width), random(height)))
  }
}

function draw () {
  // clear()
  // noLoop()

  if (actSec !== second()) {
    actSec = second()
    timer++
  }

  if (timer > 10) noLoop()

  let yoff = 0
  for (let y = 0; y <= rows; y++) {
    let xoff = 0
    for (let x = 0; x <= cols; x++) {
      let index = x + (y * cols)

      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4

      let v = p5.Vector.fromAngle(angle)
      v.setMag(1)

      flowfield[index] = v
      xoff += inc

      stroke(255, 0, 0, 100)
      strokeWeight(1)

      // line(x*scl, y*scl, x*scl + v.x, y*scl + v.y)
    }
    yoff += inc
    zoff += 0.00006
  }

  particles.forEach(particle => {
    particle.follow(flowfield)
    particle.update()
    particle.edges()
    particle.show()
  })
}
