const socket = io()


const $messages = document.getElementById('messages')
const $message_template = document.getElementById('message-template').innerHTML
const $message_form = document.getElementById('message-form')
const $user_input = document.getElementById('user-input')
const $error_message_display = document.getElementById('error-message-display')


const $room_title = document.getElementById('room-title')
const $room_count = document.getElementById('room-count')


const user_info = Qs.parse(document.URL.substr(document.URL.indexOf('?')+1))

socket.emit('join', user_info)


socket.on('update-user-count', ({ room, number_of_users, error }) => {
    $room_title.innerHTML = room || 'error'
    $room_count.innerHTML = error || 'user count ' + number_of_users
})

socket.on('message', ({ username, text, time_stamp, username_style, text_style }) => {
    const html = Mustache.render($message_template, { username, text, time_stamp, username_style, text_style })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('error', errorMessage => {
    $error_message_display.innerHTML = errorMessage
    console.log('get here')
    document.location.href = '/error.html'
})

$message_form.addEventListener('submit', e => {
    socket.emit('message-sent', $user_input.value, user_info)
    e.preventDefault()
})



