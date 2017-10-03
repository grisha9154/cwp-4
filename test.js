
const crypto = require('crypto');
const cipher = crypto.createCipher('aes192','key');

let enc = '';

cipher.on('readable',()=>{
    const data = cipher.read();
    if(data){
        enc += data.toString('hex');
    }
});

cipher.on('end',()=>{
    console.log(enc);
});

cipher.write("Some clear text data");
cipher.end();
