const socket = io()


const $messages = document.getElementById('messages')
const $message_template = document.getElementById('message-template').innerHTML
const $message_form = document.getElementById('message-form')
const $user_input = document.getElementById('user-input')

const $room_title = document.getElementById('room-title')
const $room_count = document.getElementById('room-count')


const user_info = Qs.parse(document.URL.substr(document.URL.indexOf('?')+1))

socket.emit('join', user_info)


socket.on('update-user-count', ({ room, number_of_users }) => {
    $room_title.innerHTML = room
    $room_count.innerHTML = 'user count ' + number_of_users
})

socket.on('message', ({ username, text, time_stamp, username_style, text_style }) => {
    const html = Mustache.render($message_template, { username, text, time_stamp, username_style, text_style })
    $messages.insertAdjacentHTML('beforeend', html)
})

$message_form.addEventListener('submit', e => {
    socket.emit('message-sent', $user_input.value, user_info)
    e.preventDefault()
})