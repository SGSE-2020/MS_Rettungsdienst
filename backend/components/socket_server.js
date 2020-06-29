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

//let publishExchange = null;

// initializePublisher = () => {
//     const connection = amqp.createConnection({
//         host: 'ms-rabbitmq',
//         port: 5672,
//         login: 'testmanager',
//         password: 'sgseistgeil',
//         vhost: '/'
//     });

//     connection.on('ready', () => {
//         console.log("AMQP connection established.");
//         publishExchange = connection.exchange(process.env.MESSAGE_EXCHANGE, {
//             type: process.env.MESSAGE_EXCHANGE_TYPE,
//             durable: true,
//             autoDelete: false
//         }, (exchangeRes) => {
//             console.log("AMQP exchange '" + exchangeRes.name + "' established.");
//         });

//         publishExchange.on('error', error => {
//             console.error("AMQP Exchange error: " + error.message);
//         });
//     });

//     connection.on('error', error => {
//         socket.emit('writeConsole',"AMQP Connection error: " + error.message);
//     })
// };

// exports.publishToExchange = (routingKey, data, socket) => {
//     if(publishExchange != null){
//         socket.emit('writeConsole',"AMQP - Start publishing");
//         publishExchange.publish(routingKey, Buffer.from(JSON.stringify(data)), {
//             appId: 'Bürgerbüro',
//             timestamp: new Date().getTime(),
//             contentType: 'application/json',
//             type: routingKey
//         }, () => {
//             console.log("AMQP - Published message: " + JSON.stringify(data));
//         });

//         publishExchange.on('error', error => {
//             socket.emit('writeConsole',"AMQP Exchange error: " + error.message);
//         });
//     } else {
//         socket.emit('writeConsole', "AMQP - Can not publish");
//     }
// };

MongoClient.connect(url, function (err, db) {
    //socket.emit('writeConsole',"socket server is running");
    io.on('connection', (socket) => {
        socket.emit('writeConsole','connected');
        //initializePublisher();
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
                socket.emit('writeConsole',result);
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
            socket.emit('writeConsole',"getAll")
            dbo.collection("missionReports").find({}).toArray(function (err, result) {
                if (err) throw err;
                socket.emit('writeConsole',result)
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
                        socket.emit('writeConsole', result)
                    }
                })
                .catch(err => {
                    socket.emit('writeConsole', err)
                })
        });
        socket.on('registerHospital', mission => {
            var notfallPatient = {
                userid: '6TbzcPavrSNdq1W1qAKqyfhhvxB2',
                station: 'Notaufnahme',
                faculty: '',
                symtomps: mission.symptome,
                diagnosis: mission.diagnose,
                medication: mission.medikamente
            }
            socket.emit('registeredHospital', notfallPatient);
            console.log(notfallPatient);
            grpcClient2.addPatient({
                Patient: notfallPatient
            })
                .then(result => {
                    socket.emit('registeredHospital', result.success)
                })
                .catch(err => {
                    socket.emit('writeConsole', err)
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

