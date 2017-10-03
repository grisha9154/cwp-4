const net = require('net');
const fs = require('fs');
const port = 8124;

console.log(process.argv);
    const client = new net.Socket();
    client.setEncoding('utf8');

    client.connect(port, function () {
        console.log('Connected');
        client.write('REMOTE');
    });

    client.on('data',function (data) {
        console.log(data);
        switch (data){
            case 'ACK':{
                client.write("COPY E:\\Univer\\lol.txt E:\\Univer\\copyDir\\copy.txt");
                }break;
            case 'SECOND':{
                client.write("ENCODE E:\\Univer\\lol.txt E:\\Univer\\copyDir\\encode.txt MyKey")
            }break;
            case 'THIRD':{
                client.write("DECODE E:\\Univer\\encode.txt E:\\Univer\\copyDir\\decode.txt MyKey")
            }break;
            case 'DEC':{
                return;
            }
        }
    });

client.on('close', function () {
    console.log('Connection closed');
});
