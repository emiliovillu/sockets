const socket = io.connect('http://192.168.0.55:3000', {'forceNew': true})

socket.on('messages', function(data){
  console.log(data)
  render(data)
})

const render = data => {
  
  const html = data.map(function(element, index){
    return(`<div>
              <strong>${element.author}:</strong>
              <em>${element.text}</em>
            </div>`
          )
  }).join(' ')
  
  document.getElementById('messages').innerHTML = html
  
}

const addMessage = (e) => {
  const payload = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value 
  }
  socket.emit('new-message', payload)

  document.getElementById('username').value = ''
  document.getElementById('texto').value = ''

  return false
}
