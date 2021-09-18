var socket = io();


var form = document.getElementById('form'); 
var input = document.getElementById('input');
var messages = document.getElementById('messages');

form.addEventListener('submit', (e) => { 
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = ''; 
    }
});

socket.on('chat message', (msg) => {
    console.log(msg);
    var li = document.createElement('li');
    li.innerText = msg;
    messages.appendChild(li)
});

socket.on('game over', () => {
    var li = document.createElement('li');
    li.innerText = 'game over bruh';
    messages.appendChild(li)
});