const moment = require('moment')

const createMessage = (text, username) => {
    let username_style = ''
    let text_style = ''
    if (username === 'me') {
        username_style = 'color:green'
        text_style = 'font-weight:bold'
    }
    return {
        text,
        time_stamp: moment(new Date().now).format('hh:mm:ss'),
        username: username || 'admin',
        username_style,
        text_style
    }
}

module.exports = {
    createMessage
}