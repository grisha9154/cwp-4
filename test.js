
testFor(function () {
    console.log("Callback is call")
});
koko(function () {
    console.log("koko calback is work");
});

function testFor(callback) {
    for(let i=0;i<100;i++){
        console.log(i);
    }
    callback();
}
function koko(callback) {
    let sum=0;
    for(let i=0;i<100;i++){sum+=i;}
    console.log("koko is working");
    callback();

}
