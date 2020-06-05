var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, () => {
  console.log(' Socket.io Server listening on *:3000');
});

io.on('connection', function (socket) {
  console.log("connected");
  socket.on('Create', function (mission) {
    console.log("create");
    console.log(mission)
    mission.einsatzID='123';
    socket.emit('New mission', mission);
    console.log("Mission send")
  })
})