var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res){
    res.status(200).send("Hola mundo desde una ruta");
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado!',
    nickname: 'Bot'
}];

io.on('connection', function(socket){
   console.log("El cliente con IP: " + socket.handshake.address + " se ha conectado!");

   socket.emit('messages', messages);

   socket.on('add-message', function(data){
       messages.push(data);

       io.sockets.emit('messages', messages);
   });

});

server.listen(6677, function(){
    console.log("El servidor esta funcionando en http://localhost:6677");
});

