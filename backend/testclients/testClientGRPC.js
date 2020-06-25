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
console.log(routeguide)
var client = new routeguide.RettungsdienstService('localhost:50051',
                                       grpc.credentials.createInsecure());
console.log(client )


reqMis = {
    missionID: "638363"
}                                       
client.getMissionReport(reqMis, function(err, feature){
    if (err){
        console.log("error");
    }
    else {
        console.log("MissionID: " + feature.missionID);
        console.log("PatientenID: "+ feature.patientenID);
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

