var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http)
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
var ObjectID = require('mongodb').ObjectID;



const url = 'mongodb://localhost:27017';

const dbName = 'local';

MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected succesfully to db");

  const db = client.db(dbName);

  http.listen(3000, () => {
    console.log(' Socket.io Server listening on *:3000');
  });

  const createMissionDB = function (mission) {
    const collection = db.collection('missionReports');
    collection.insertOne(mission, function (err, result) {
      assert.equal(err, null);
    });
  }

  const endMissionDB = function (mission) {
    const collection = db.collection('missionReports');
    console.log(mission);
    collection.updateOne({_id: new ObjectID(mission._id)},{$set: {medikamente: mission.medikamente, symptome: mission.symptome,diagnose: mission.diagnose, einsatzende:mission.einsatzende}}, function (err, result) {
      assert.equal(err, null);
    });
  }

  io.on('connection', function (socket) {
    console.log("connected");
    socket.on('Create', function (mission) {
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
      createMissionDB(mission);
      socket.broadcast.emit('New mission', mission);
      mission._id = null;
      mission.patientenID = null;
      mission.adresse = null;
      mission.einsatzbegin = null;
      mission.einsatzende = null;
      mission.sanitater = null;
      mission.symptome = null;
      mission.medikamente = null;
      mission.diagnose = null;
      socket.emit('New mission', mission);
    });
    socket.on('End', function (mission) {
      var x = new Date();
      var y = x.getFullYear().toString();
      var m = (x.getMonth() + 1).toString();
      var d = x.getDate().toString();
      var h = x.getHours().toString();
      var min = x.getMinutes().toString();
      (d.length == 1) && (d = '0' + d);
      (m.length == 1) && (m = '0' + m);
      var yyyymmddhhmin = y + "/" + m + "/" + d + "/" + h + ":" + min;
      mission.einsatzende = yyyymmddhhmin;
      endMissionDB(mission);
      mission._id = null;
      mission.patientenID = null;
      mission.adresse = null;
      mission.einsatzbegin = null;
      mission.einsatzende = null;
      mission.sanitater = null;
      mission.symptome = null;
      mission.medikamente = null;
      mission.diagnose = null;
      socket.emit('End mission', mission);
    })
  })
});
