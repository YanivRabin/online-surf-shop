// const app = require('express')();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
//
// app.get('/chat', (req, res) => {
//     res.sendFile(__dirname + '/chat.html');
// });
//
// io.on('connection', (req,res,socket) => {
//     socket.broadcast.emit('joined', socket.username+' Joined');
//
//     socket.on('disconnect', () => {
//         socket.broadcast.emit('disconnected', socket.username+' Disconnected');
//     });
//
//     socket.on('new message', (msg) => {
//         io.emit('new message', socket.username + ': ' + msg);
//     });
// });
//
// http.listen(3000);
