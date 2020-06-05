var PROTO_PATH = __dirname + '\\..\\proto\\rettungsdienst.proto';
console.log(PROTO_PATH);
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

var routeguide = protoDescriptor.rtguide;

function gettingMisReport(misID) {
    var dateBegin = new Date(2020, 5, 28, 17, 12, 34)
    var dateEnd = new Date(2020, 5, 28, 18, 24, 23)
    var mission = {
        missionID : misID.missionID,
        patientenID : "74632s636",
        street : "ErfunderWeg21",
        zipCode : "73628",
        city : "Musterstadt",
        missionBegin : dateBegin,
        missionEnd : dateEnd,
        sanitaeter : "7368263",
        symptome : "Bewusstlos, kein Herzschlag, Halsschlagader durchtrennt",
        medikamente : "100mg Aspirin, 2xGloboli",
    };
    return mission;
}

function creatingTransport(trans){
    missID=  {
        missionID: "74653"
    }
    return missID;
}

function getMissionReport(call, callback){
    callback(null, gettingMisReport(call.request));
}

function registerTransport(call, callback){
    callback(null, creatingTransport(call.request));
}

function getServer() {
    var server = new grpc.Server();
    server.addService(routeguide.RettungsdienstService.service,{
        getMissionReport: getMissionReport,
        registerTransport : registerTransport
    });
    return server;
}

var grpcServer = getServer();
grpcServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
grpcServer.start();
console.log("GRPC-Server is running");