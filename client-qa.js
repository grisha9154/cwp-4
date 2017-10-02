// client.js
const fs = require('fs');
const net = require('net');
const port = 8124;
let q = [];
let a =[];
let lastQestId=0;
fs.readFile("E:\\Univer\\5 семестр\\ПСКП\\PSKP\\Лабы\\lab2\\PSKP-cwp-2\\QA.json","utf-8",function (err, copydata) {
    JSON.parse(copydata, function (key, data) {
        if(key!='')
    setRandValue(q,a,key,data);
    });

    const client = new net.Socket();


    client.setEncoding('utf8');

    client.connect(port, function () {
        console.log('Connected');

        client.write('QA');
    });

    client.on('data', function (data) {
        console.log('Server sey: ' + data);
        switch (data) {
            case 'ACK': {
                client.write(q[lastQestId]);
                lastQestId++;
            }
                break;
            case a[lastQestId-1]:{
                console.log("Вопрос: "+q[lastQestId-1]+", Ответ: "+a[lastQestId-1]+" верно");
                if (lastQestId<3){
                   client.write(q[lastQestId]);
                    lastQestId++
                }
                else{
                    client.write('q');
                }
            }break;
            case 'DEC': {
            }break;
            default:{
                console.log("Вопрос: "+q[lastQestId-1]+", Ответ: "+data+" не верно");
                if (lastQestId<3){
                    client.write(q[lastQestId]);
                    lastQestId++
                }
                else{
                    client.write('q');
                }
            }break;
        }
    });

    client.on('close', function () {
        console.log('Connection closed');
    });
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function setRandValue(q,a,key,data) {
    const i = getRandomInt(0,2);
    if(q[i]==null){
        q[i] = key;
        a[i] = data;
    }else setRandValue(q,a,key,data);
}


