const { MongoClient } = require('mongodb');
const assert = require('assert')
const path = require('path');
const ObjectID = require('mongodb').ObjectID;
const grpc_module = require('grpc')
const protoLoader = require('@grpc/proto-loader')
var mongo = require('mongodb').MongoClient;
const caller = require('grpc-caller')
const amqp = require('amqp')


var io = require('socket.io').listen(8080).sockets;

var url = "mongodb://localhost:27017"
// grpc

const userProtoPath = path.resolve(__dirname, '../proto/user.proto');
const grpcClient = caller('ms-buergerbuero:50051', userProtoPath, 'UserService');

const patientProtoPath = path.resolve(__dirname, '../proto/patient.proto');
const grpcClient2 = caller('ms-krankenhaus:50051', patientProtoPath, 'Hospital');

// var connection = amqp.createConnection({ host: 'ms-rabbitmq', port: 5672, password: 'sgseistgeil', login: 'testmanager', vhost: '/' });

// connection.on('error', function (e) {
//     console.log('error', e);
// });

// // connection.on('ready', function () {
// //     connection.queue('test', function (q) {
// //         q.bind('#');

// //         q.subscribe(function (message) {
// //             console.log(message);
// //         })
// //     })
// // });
MongoClient.connect(url, function (err, db) {
    console.log("socket server is running");
    io.on('connection', (socket) => {
        console.log('connected');
        // connection.on('error', function (e) {
        //     socket.emit('CompleteLogin', 1, e)
        // });
        // connection.on('ready', function () {
        //     connection.queue('test', function (q) {
        //         q.bind('#');

        //         q.subscribe(function (message) {
        //             connection.on('ready', function () {
        //                 connection.queue('test', function (q) {
        //                     q.bind('#');

        //                     q.subscribe(function (message) {
        //                         socket.emit('CompleteLogin', 1, e)
        //                     })
        //                 })
        //             });;
        //         })
        //     })
        // });
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
            dbo.collection("missionReports").findOne({ einsatzbegin: mission.einsatzbegin }, function (err, result) {
                if (err) throw err;
                mission = result;
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
        socket.on('GetAll', function () {
            console.log("getAll")
            dbo.collection("missionReports").find({}).toArray(function (err, result) {
                if (err) throw err;
                console.log(result)
                socket.emit('getAll', result)
            });
        });
        socket.on('Login', idtoken => {
            grpcClient.verifyUser({
                token: idtoken
            })
                .then(result => {
                    if (result.uid) {
                        socket.emit('CompleteLogin', 1, result.uid)
                    }
                    else {
                        socket.emit('CompleteLogin', 1, result)
                    }
                })
                .catch(err => {
                    socket.emit('CompleteLogin', 1, err)
                })
        });
        socket.on('registerHospital', mission => {
            var notfallPatient = {
                userid: '6TbzcPavrSNdq1W1qAKqyfhhvxB2',
                station: 'Notaufnahme',
                faculty: '',
                symptoms: mission.symptome,
                diagnosis: mission.diagnose,
                medication: mission.medikamente
            }
            console.log(notfallPatient);
            grpcClient2.addPatient({
                Patient: notfallPatient
            })
            .then(result => {
                socket.emit('registeredHospital', result.success)
            })
            .catch(err => {
                socket.emit('registeredHospital', 1, err)
            })
        })
    });
    var dbo = db.db("ms_rettungsdienst");
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

