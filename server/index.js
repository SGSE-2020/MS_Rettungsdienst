const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync('./proto/rettungsdienst.proto');
const notesProto = grpc.loadPackageDefinition(packageDefinition);

const mission = {
    missionID: '1234',
    patientenID: '5678',
    street: 'Rietberger Straße 1',
    zipCode: '33378',
    city: 'Rheda-Wiedenbrück',
    missionBegin: {
        day: 15,
        month: 6,
        year: 2004,
        hour: 16,
        minute:34
    }, 
    missionEnd: {
        day: 15,
        month: 6,
        year: 2004,
        hour: 17,
        minute: 56
    },
    sanitaeter: '87687',
    symptome: 'Kotzen',
    medikamente: 'Asperin 100mg'
}
const server = new grpc.Server()
server.addService(notesProto.rettungsdienstService.rettungsdienstService, {
    getMissionReport: (_, callback) => {
        callback('8767', mission)
    },
})
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()