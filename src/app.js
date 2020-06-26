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
        addUser({username, room, id: socket.id})
        socket.emit('message', createMessage(`Welcome to \'${room}\' ${username}!`))
        socket.broadcast.to(room).emit('message', createMessage(`${username} joined the room`))
    })

    socket.on('message-sent', (text, {room, username}) => {
        socket.emit('message-recieved', createMessage(text, 'me'))
        socket.broadcast.to(room).emit('message-recieved', createMessage(text,username))
    })

    socket.on('disconnect', () => {

    })
})

server.listen(port, () => {
    console.log(`listening on port ${port}`)
})