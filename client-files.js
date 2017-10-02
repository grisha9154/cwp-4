const net = require('net');
const fs = require('fs');
const port = 8124;

const name = [];
let idName = 0;
const fileAdress = [];
let idFileAdress = 0;
let sendId =0;

console.log(process.argv);
getAllDir(process.argv, function () {
    const client = new net.Socket();
    client.setEncoding('utf8');

    client.connect(port, function () {
        console.log('Connected');
        client.write('FILES');
    });

    client.on('data',function (data) {
        console.log(data);
        switch (data){
            case 'ACK':{
                let sum=0;
                for(let z = 0;z<9999999;z++){
                    sum+=z;
                }
                console.log(sum);
                console.log(name);
                sendAllName(name,client);
            }break;

            case 'DEC':{
                return;
            }

            case 'Send buf':{
                if(sendId!=fileAdress.length){
                    fs.readFile(fileAdress[sendId], function (err, data){
                        sendId++;
                        const buf = Buffer.from(data);
                        console.log("Отправил файл "+ name[sendId]);
                        client.write("Send"+buf);
                    });}else{
                    fs.close(0,function () {

                    });
                    client.write("End");
                }
            }break;

        }
    });
});




function sendAllName(allName,client) {
    let str = "";
    console.log(allName);
    for(let i = 0; i<allName.length;i++){
        console.log(i);
        str +="N"+allName[i];
    }
    console.log("Строка имён " +str);
    client.write(str);
}

function getAllDir(dirPath,callback) {
    const i =2;
        fs.readdir(dirPath[i], function (err, files) {
            if (!err) {
                console.log(files);
                for (let j = 0; j < files.length; j++) {
                    fs.stat(dirPath[i] + "\\" + files[j], function (err, stats) {
                        if (!err) {
                            if (stats.isFile() && files[j].indexOf(".txt")+1) {
                                console.log(files[j]);
                                fs.readFile(dirPath[i] + '\\' + files[j], function (err, data) {
                                    console.log(data);
                                    name[idName++] = files[j];
                                    fileAdress[idFileAdress++] = dirPath[i] + '\\' + files[j];
                                    if(j===files.length-1){
                                        callback();
                                    }
                                })
                            } else {
                                console.log("Ошибка при определении статуса " + dirPath[i] + '\\' + files[j])
                            }
                        }
                    })
                }
            } else {
                console.log("Ошибка чтения директории");
            }
        })

}