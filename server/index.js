const express = require('express')
const app = express()
const server = require('http').createServer(app)

const drone = require('ar-drone').createClient()
const stream = require('dronestream')

try {
    app.use(express.static(__dirname + '/public'))
    stream.listen(3001)
    const io = require('socket.io')(server)
    const speed = 0.1

    io.on('connection', socket => {
        socket.on('stop', data => {
            drone.stop()
        })
        socket.on('takeoff', data => {
            drone.stop()
            drone.takeoff()
        })
        socket.on('land', data => {
            drone.stop()
            drone.land()
        })
        socket.on('up', data => {
            drone.up(speed)
            drone.after(1000, function(){ drone.stop() })
        })
        socket.on('down', data => {
            drone.down(speed)
            drone.after(1000, function(){ drone.stop() })
        })
        socket.on('left', data => {
            drone.left(speed)
            drone.after(1000, function(){ drone.stop() })
        })
        socket.on('right', data => {
            drone.right(speed)
            drone.after(1000, function(){ drone.stop() })
        })
        socket.on('front', data => {
            drone.front(speed)
            drone.after(1000, function(){ drone.stop() })
        })
        socket.on('back', data => {
            drone.back(speed)
            drone.after(1000, function(){ drone.stop() })
        })
        socket.on('cw', data => {
            drone.clockwise(speed)
            drone.after(1000, function(){ drone.stop() })
        })
        socket.on('ccw', data => {
            drone.counterClockwise(speed)
            drone.after(1000, function(){ drone.stop() })
        })
        
    })

    server.listen(3000, () => console.log('Server started'))

} catch (e) {
    drone.land()
}