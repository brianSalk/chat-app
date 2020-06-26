const users = []

const addUser = ({username, room, id}) => {
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if (!room || !username) {
        return {error: "please enter a valid room and username"}
    }
    if (getUsersInRoom(room).findIndex(user => user.username === username) !== -1) {
        return {error: 'that username is already taken!'}
    }
    const user = {
        username,
        room,
        id
    }
    users.push(user)
    return { user }
}

const getUsersInRoom = room => {
    room = room.trim().toLowerCase()
    return users.filter(user => user.room === room)
}

const removeUser = ({username, room}) => {
    const index = users.findIndex(user => user.username === username && user.room === room)
    return users.splice(index, 1)[0]
}

const getUserById = id => {
    return users.find(user => user.id === id)
}

module.exports = {
    addUser,
    getUsersInRoom,
    removeUser,
    getUserById
}