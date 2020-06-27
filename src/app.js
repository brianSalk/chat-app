const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const {createMessage} = require('./utils/messages.js')
const { addUser, getUserById, getUsersInRoom, removeUser } = require('./utils/users.js')

const port = process.env.PORT || 3000

const app = express()
app.use(express.static('public'))
const server = http.createServer(app)
const io = socketio(server)



io.on('connection', socket => {
    socket.on('join', ({room, username}) => {
        const {user, error} = addUser({username, room, id: socket.id})
        if (error) {
            return socket.emit('update-user-count', {error})
        }
        socket.join(room)
        io.to(room).emit('update-user-count', ({ room, number_of_users: getUsersInRoom(room).length}))
        socket.emit('message', createMessage(`Welcome to ${room}!`))
        socket.broadcast.to(room).emit('message', createMessage(`${username} joined the room`))
    })

    socket.on('message-sent', (text, {room, username}) => {
        socket.emit('message', createMessage(text, 'me'))
        socket.broadcast.to(room).emit('message', createMessage(text,username))
    })

    socket.on('disconnect', () => {
        const user = getUserById(socket.id)
        const room = removeUser(user).room
        io.to(room).emit('update-user-count', ({ room, number_of_users: getUsersInRoom(room).length }))
        io.to(room).emit('message', createMessage(`${user.username} left the room.`))

    })
})

server.listen(port, () => {
    console.log(`listening on port ${port}`)
})