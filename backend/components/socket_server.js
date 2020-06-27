const { MongoClient } = require('mongodb');
const assert = require('assert')
const ObjectID = require('mongodb').ObjectID;

var io = require('socket.io').listen(3000).sockets;
var mongo = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/ms_rettungdienst"

MongoClient.connect(url, function (err, db) {
    io.on('connection', (socket) => {
        console.log('connected');
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
            dbo.collection("missionReports").findOne({einsatzbegin: mission.einsatzbegin}, function (err, result) {
                if (err) throw err;
                mission=result;
                console.log(result)
            })
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
        });
        socket.on('GetAll', function(){
            console.log("getAll")
            dbo.collection("missionReports").find({}).toArray(function (err, result) {
                if (err) throw err;
                console.log(result)
                socket.emit('getAll', result)
            });
        });
    });
    var dbo = db;
    // var myobj = { name: "Company Inc", address: "Highway 37" };
    // dbo.collection("missionReports").insertOne(myobj, function (err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");
    //     db.close();
    // });
    const endMissionDB = function (mission) {
        console.log(mission);
        dbo.collection("missionReports").updateOne({ _id: new ObjectID(mission._id) }, { $set: { medikamente: mission.medikamente, symptome: mission.symptome, diagnose: mission.diagnose, einsatzende: mission.einsatzende } }, function (err, result) {
            assert.equal(err, null);
        });
    }
    const createMissionDB = function (mission) {
        console.log(mission);
        dbo.collection("missionReports").insertOne(mission, function (err, result) {
            assert.equal(err, null);
        });
    }
    

})




// const io = require('socket.io').listen(3000).sockets
// const MongoClient = require('mongodb').MongoClient
// const assert = require('assert')
// var ObjectID = require('mongodb').ObjectID;
// var grpc = require('grpc');
// var protoLoader = require('@grpc/proto-loader');

// var PROTO_PATH_BURGERBURO = __dirname + '/../proto/user.proto';

// const url = 'mongodb://mongo@mongo';


// var packageDefinition = protoLoader.loadSync(
//   PROTO_PATH_BURGERBURO,
//   {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true
//   });
// var routeguide = grpc.loadPackageDefinition(packageDefinition).user;
// var clientBurgerburo = new routeguide.UserService('ms-buergerbuero:50051',
//   grpc.credentials.createInsecure());

// console.log(url)
// MongoClient.connect(url, function (err, client) {
//   if (err) {
//     throw err;
//   }
//   //var db = client.db('ms_rettungsdienst')
//   console.log("Connected succesfully to db");
//   console.log(db)

//   io.on('connection', function (socket) {
//     //let collection = db.collection('missionReports');
//     const createMissionDB = function (mission) {
//       console.log(mission)
//       collection.insertOne(mission, function (err, result) {
//         assert.equal(err, null);
//       });
//     }

//     const endMissionDB = function (mission) {
//       let collection = db.collection('missionReports');
//       console.log(mission);
//       collection.updateOne({ _id: new ObjectID(mission._id) }, { $set: { medikamente: mission.medikamente, symptome: mission.symptome, diagnose: mission.diagnose, einsatzende: mission.einsatzende } }, function (err, result) {
//         assert.equal(err, null);
//       });
//     }

//     //io.on('connection', function (socket) {
//       console.log("connected");
//       socket.on('Create', function (mission) {
//         var x = new Date();
//         var y = x.getFullYear().toString();
//         var m = (x.getMonth() + 1).toString();
//         var d = x.getDate().toString();
//         var h = x.getHours().toString();
//         var min = x.getMinutes().toString();
//         (d.length == 1) && (d = '0' + d);
//         (m.length == 1) && (m = '0' + m);
//         var yyyymmddhhmin = y + "/" + m + "/" + d + "/" + h + ":" + min;
//         mission.einsatzbegin = yyyymmddhhmin;
//         createMissionDB(mission);
//         socket.broadcast.emit('New mission', mission);
//         mission._id = null;
//         mission.patientenID = null;
//         mission.adresse = null;
//         mission.einsatzbegin = null;
//         mission.einsatzende = null;
//         mission.sanitater = null;
//         mission.symptome = null;
//         mission.medikamente = null;
//         mission.diagnose = null;
//         socket.emit('New mission', mission);
//       });
//       socket.on('End', function (mission) {
//         var x = new Date();
//         var y = x.getFullYear().toString();
//         var m = (x.getMonth() + 1).toString();
//         var d = x.getDate().toString();
//         var h = x.getHours().toString();
//         var min = x.getMinutes().toString();
//         (d.length == 1) && (d = '0' + d);
//         (m.length == 1) && (m = '0' + m);
//         var yyyymmddhhmin = y + "/" + m + "/" + d + "/" + h + ":" + min;
//         mission.einsatzende = yyyymmddhhmin;
//         endMissionDB(mission);
//         mission._id = null;
//         mission.patientenID = null;
//         mission.adresse = null;
//         mission.einsatzbegin = null;
//         mission.einsatzende = null;
//         mission.sanitater = null;
//         mission.symptome = null;
//         mission.medikamente = null;
//         mission.diagnose = null;
//         socket.emit('End mission', mission);
//       });
//       socket.on('Login', idtoken => {
//         clientBurgerburo.verifyUser(idtoken, function (err, feature) {
//           if (err) {
//             console.log("error");
//             socket.emit('CompleteLogin', 1, err)
//           }
//           else {
//             console.log('clompeted')
//             socket.emit('CompleteLogin', 1, feature)
//           }
//         });
//       })
//     //});
//   });
// })

