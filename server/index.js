const express = require('express')
const app = express()
const server = require('http').createServer(app)

const drone = require('ar-drone').createClient()
const stream = require('dronestream')

const speed = 0.1

try {
    app.use(express.static(__dirname + '/public'))
    stream.listen(3001)
    const io = require('socket.io')(server)

    io.on('connection', socket => {
        socket.on('stop', data => {
            console.log('stop')
            drone.stop()
        })
        socket.on('takeoff', data => {
            console.log('stop')
            drone.stop()
            console.log('takeoff')
            drone.takeoff()
        })
        socket.on('land', data => {
            console.log('stop')
            drone.stop()
            console.log('land')
            drone.land()
        })
        socket.on('up', data => {
            console.log('up')
            drone.up(speed)
        })
        socket.on('down', data => {
            console.log('down')
            drone.down(speed)
        })
        socket.on('left', data => {
            console.log('left')
            drone.left(speed)
        })
        socket.on('right', data => {
            console.log('right')
            drone.right(speed)
        })
        socket.on('front', data => {
            console.log('front')
            drone.front(speed)
        })
        socket.on('back', data => {
            console.log('back')
            drone.back(speed)
        })
        socket.on('cw', data => {
            console.log('cw')
            drone.clockwise(speed)
        })
        socket.on('ccw', data => {
            console.log('ccw')
            drone.counterClockwise(speed)
        })
        
    })

    server.listen(3000, () => console.log('Server started'))

} catch (e) {
    drone.land()
}