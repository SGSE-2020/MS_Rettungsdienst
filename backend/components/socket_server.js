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
    mission.einsatzID = '12345';
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    var h = x.getHours().toString();
    var min = x.getMinutes().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var yyyymmddhhmin = y + "/" + m + "/" + d + "/" + h + ":" + min;
    mission.einsatzbegin = yyyymmddhhmin;
    socket.broadcast.emit('New mission', mission);
    mission.einsatzID= null;
      mission.patientenID= null;
      mission.adresse= null;
      mission.einsatzbegin= null;
      mission.einsatzende= null;
      mission.sanitater= null;
      mission.symptome= null;
      mission.medikamente= null;
      mission.diagnose= null;
      socket.emit('New mission', mission);
  });
  socket.on('End', function(mission){
      mission.einsatzID= null;
      mission.patientenID= null;
      mission.adresse= null;
      mission.einsatzbegin= null;
      mission.einsatzende= null;
      mission.sanitater= null;
      mission.symptome= null;
      mission.medikamente= null;
      mission.diagnose= null;
      socket.emit('End mission', mission);
  })
})
