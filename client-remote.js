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
                }break;

            case 'DEC':{
                return;
            }
        }
    });