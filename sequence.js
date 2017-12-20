const drone  = require('ar-drone').createClient()

console.log('takeoff')
drone.takeoff()

const recognitionTime = 5000
const spinningTime = 3000
const spinningSpeed = 0.1

drone
  .after(recognitionTime, function() { // first recognition
    console.log('cw')
    this.clockwise(spinningSpeed)
  })
  .after(spinningTime, function() { // spinning
    console.log('stop')
    this.stop()
  })
  .after(recognitionTime, function() { // second recognition
    console.log('cw')
    this.clockwise(spinningSpeed)
  })
  .after(spinningTime, function() { // spinning
    console.log('stop')
    this.stop()
  })
  .after(recognitionTime, function() { // third recognition
    console.log('cw')
    this.clockwise(spinningSpeed)
  })
  .after(spinningTime, function() { // spinning
    console.log('stop')
    this.stop()
  })
  .after(recognitionTime, function() { // fourth recognition
    console.log('land')
    this.land()
  })