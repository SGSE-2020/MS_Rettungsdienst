var PROTO_PATH = __dirname + '/../proto/rettungsdienst.proto';


var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var routeguide = grpc.loadPackageDefinition(packageDefinition).rtguide;
var client = new routeguide.RettungsdienstService('localhost:50051',
                                       grpc.credentials.createInsecure());


reqMis = {
    missionID: "638363"
}                                       
client.getMissionReport(reqMis, function(err, feature){
    if (err){
        console.log("error");
    }
    else {
        console.log("MissionID: " + feature.missionID);
    }
});

transport = {
    location: "Ligusterweg 2, 736376 Musterstadt",
    patientenID: "7r4647"
}

client.registerTransport(transport, function(err, feature){
    if (err){
        console.log("error");
    }
    else {
        console.log("MissionID: " + feature.missionID);
    }
});

