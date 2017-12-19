const startArDRoneStream = () => {
    new NodecopterStream(document.getElementById('stream'), { port: 3001 })
}

$(() => {

    const currentKey = $('#currentKey')
    const bTakeoff = $('#bTakeoff')
    const bLand = $('#bLand')
    const bStop = $('#bStop')

    const socket = io()

    startArDRoneStream()

    socket.on('connect', () => console.log('connection successful!'))

    try {
        bTakeoff.on('click', () => socket.emit('takeoff'))
        bLand.on('click', () => socket.emit('land'))
        bStop.on('click', () => socket.emit('stop'))
    
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
            't': 'takeoff'
        }
    
        $(document).keydown(e => {
            if (e.key in keymap) {
                e.preventDefault()
                socket.emit(keymap[e.key])
                currentKey.hide()
                currentKey.html(keymap[e.key])
                currentKey.show(100)
            }
        })
    } catch (e) {
        socket.emit('land')
    }
})