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

const krankenakteProtoPath = path.resolve(__dirname, '../proto/krankenakte.proto');
const grpcClient3 = caller('ms-hausarzt:50051', krankenakteProtoPath, 'KrankenakteService');

let publishExchange = null;

initializePublisher = () => {
    const connection = amqp.createConnection({
        host: 'ms-rabbitmq',
        port: 5672,
        login: 'testmanager',
        password: 'sgseistgeil',
        vhost: '/'
    });

    connection.on('ready', () => {
        console.log("AMQP connection established.");
        publishExchange = connection.exchange('rettungsdienst', {
            type: 'fanout',
            durable: true,
            autoDelete: false
        }, (exchangeRes) => {
            console.log("AMQP exchange '" + exchangeRes.name + "' established.");
        });

        publishExchange.on('error', error => {
            console.error("AMQP Exchange error: " + error.message);
        });
    });

    connection.on('error', error => {
        console.log("AMQP Connection error: " + error.message);
    })
};

initializeConsumer = (socket) => {
    const connection = amqp.createConnection({
        host: 'ms-rabbitmq',
        port: 5672,
        login: 'testmanager',
        password: 'sgseistgeil',
        vhost: '/'
    });

    connection.on('ready', () => {
        socket.emit('writeConsole', "AMQP connection for consumer established.");
        connection.exchange('buergerbuero', {
            type: 'fanout',
            durable: true,
            autoDelete: false
        }, (exchangeRes) => {
            socket.emit('writeConsole', "AMQP exchange '" + exchangeRes.name + "' established.");

            connection.queue('buergerbuero_nutzerVerstorben', queue => {
                socket.emit('writeConsole', "AMQP queue '" + queue.name + "' is open.");

                // queue.bind('rettungsdienst', 'person.verstorben', callback => {
                //     socket.emit('writeConsole',"AMQP queue '" + queue.name + "' is bound to exchange: " + exchangeRes.name + ".");
                // });

                queue.subscribe((msg) => {
                    socket.emit('writeConsole', "AMQP: Consume message: " + JSON.stringify(msg));
                    if (msg !== undefined) {

                    } else {
                        console.error("AMQP: Message malformed");
                    }
                });
            });
        });

        publishExchange.on('error', error => {
            console.error("AMQP Exchange error: " + error.message);
        });
    });

    connection.on('error', error => {
        console.error("AMQP Connection error: " + error.message);
    })
};

publishToExchange = (routingKey, data, socket) => {
    if (publishExchange != null) {
        socket.emit('writeConsole', "AMQP - Start publishing");
        publishExchange.publish(routingKey, Buffer.from(JSON.stringify(data)), {
            appId: 'rettungsdienst',
            timestamp: new Date().getTime(),
            contentType: 'application/json',
            type: 'person.verstorben'
        }, () => {
            console.log("AMQP - Published message: " + JSON.stringify(data));
        });

        publishExchange.on('error', error => {
            socket.emit('writeConsole', "AMQP Exchange error: " + error.message);
        });
    } else {
        socket.emit('writeConsole', "AMQP - Can not publish");
    }
};

MongoClient.connect(url, function (err, db) {
    io.on('connection', (socket) => {
        socket.emit('writeConsole', 'connected');
        //initializePublisher();
        //initializeConsumer(socket);
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
                socket.emit('writeConsole', result);
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
            socket.emit('writeConsole', "getAll")
            dbo.collection("missionReports").find({}).toArray(function (err, result) {
                if (err) throw err;
                socket.emit('getAll', result)
            });
        });
        socket.on('Login', idtoken => {
            socket.emit('writeConsole', "Login")
            grpcClient.verifyUser({
                token: idtoken
            })
                .then(result => {
                    if (result.uid) {
                        socket.emit('writeConsole', result.uid)
                        socket.emit('writeConsole', result)
                        dbo.collection("user").findOne({ userid: result.uid }, function (err, res) {
                            socket.emit('CompleteLogin', res.role, res.userid, res.status)
                        })
                    }
                    else {
                        socket.emit('writeConsole', result)
                    }
                })
                .catch(err => {
                    socket.emit('writeConsole', err)
                })
        });
        socket.on('getAllSanis', function () {
            console.log("ist da")
            socket.emit('writeConsole', "GetAllSanis")
            dbo.collection("user").find({ status: 1.0, role: "2.0" }).toArray(function (err, result) {
                if (err) socket.emit('writeConsole', err)
                socket.emit("AllFreeSanis", result)
            })
            console.log("durch")
        });

        socket.on('registerHospital', mission => {
            var notfallPatient = {
                userid: mission.patientenID,
                station: 'Notaufnahme',
                faculty: '',
                symtomps: mission.symptome,
                diagnosis: mission.diagnose,
                medication: mission.medikamente
            }
            socket.emit('writeConsole', notfallPatient);
            grpcClient2.addPatient({
                userid: '6TbzcPavrSNdq1W1qAKqyfhhvxB2',
                station: 'Notaufnahme',
                faculty: '',
                symtomps: mission.symptome,
                diagnosis: mission.diagnose,
                medication: mission.medikamente
            })
                .then(result => {
                    socket.emit('registeredHospital', result.success)
                })
                .catch(err => {
                    socket.emit('writeConsole', err)
                })
        });
        socket.on('deadPatient', mission => {
            socket.emit('writeConsole', "Deadpatient wird ausgeführt");
            data = {
                patientID: 'QOVFnDNw7mhsZyOgnVL1dMMDpd83',
                Ort: mission.adresse
            }
            publishToExchange('person.verstorben', data, socket)
        });
        socket.on('getPatientInfo', patient => {
            socket.emit('writeConsole', "GetPatient wird ausgeführt");
            socket.emit('writeConsole', patient)
            grpcClient3.getKrankenakte({
                userid: patient
            })
                .then(result => {
                    socket.emit('getPatient', result)
                })
                .catch(err => {
                    socket.emit('writeConsole', err)
                })
        });
        socket.on('createUser', user => {
            socket.emit('writeConsole', user)
            dbo.collection("user").insertOne({userid: user.id, role: user.role, status: user.status},function (err, result) {
                if (err) socket.emit('writeConsole', err)
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

