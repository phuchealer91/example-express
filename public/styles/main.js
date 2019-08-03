
// var fetch = require('node-fetch');

function removeUser(id) {
    fetch(`users/${id}`, {
        method: 'delete'
    }).then(() => {
        window.location.href = '/users'
    })
}
