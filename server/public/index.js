const startArDRoneStream = () => {
    new NodecopterStream(document.getElementById('stream'), { port: 3001 })
}

$(() => {

    const currentKey = $('#currentKey')

    const flashKey = key => {
        currentKey.hide()
        currentKey.html(key)
        currentKey.show(100)
    }

    const bTakeoff = $('#bTakeoff')
    const bLand = $('#bLand')
    const bCW = $('#bCW')
    const bCCW = $('#bCCW')
    const bStop = $('#bStop')

    const socket = io()

    startArDRoneStream()

    socket.on('connect', () => console.log('connection successful!'))

    try {
        bTakeoff.on('click', () => {
            socket.emit('takeoff')
            flashKey(`<span style="color:green">takeoff</span>`)
        })
        bLand.on('click', () => {
            socket.emit('land')
            flashKey(`<span style="color:green">land</span>`)
        })
        bCW.on('click', () => {
            socket.emit('cw')
            flashKey(`<span style="color:green">cw</span>`)
        })
        bCCW.on('click', () => {
            socket.emit('ccw')
            flashKey(`<span style="color:green">ccw</span>`)
        })
        bStop.on('click', () => {
            socket.emit('stop')
            flashKey(`<span style="color:green">stop</span>`)
        })
    
        const keymap = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'a': 'left',
            'd': 'right',
            'w': 'front',
            's': 'back',
            'e': 'cw',
            'q': 'ccw',
            'p': 'stop',
            'l': 'land',
            ' ': 'land',
            't': 'takeoff',
            'Enter': 'stop',
            'Shift': 'stop'
        }
    
        $(document).keydown(e => {
            if (e.key in keymap) {
                e.preventDefault()
                socket.emit(keymap[e.key])
                flashKey(`<span style="color:blue">${keymap[e.key]}</span>`)
            } else {
                flashKey(`<span style="color:gray">${e.key.toString().toUpperCase()}</span>`)
            }
        })
    } catch (e) {
        socket.emit('land')
    }
})