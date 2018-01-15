const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const messages = [{
  id: 1,
  text: 'hola desde el chat',
  author: 'Emilio'
}]

app.use(express.static('public'))

app.get('/', function (req, res){
  res.status(200).send('Chat web')
})

io.on('connection', function(socket){
  console.log('alguien se ha conectado')
  socket.emit('messages', messages)
  socket.on('new-message', function(data){
    messages.push(data)

    io.sockets.emit('messages', messages)
  })
})

server.listen(3000, function(){
  console.log('Servidor corriendo en http://localhost:3000')
})  