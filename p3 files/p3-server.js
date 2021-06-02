//import fastify, fs, and coinCount
const fs = require('fs');
const fastify = require("fastify")();
const {coinCount} = require('./p3-module.js')

fastify.get("/",(request,reply)=>{
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
        if (err) {
            reply
            .code(500)
            .header("Content-Type","text/html; charset=utf-8")
            .send("<h1>Error Occured</h1>")
        } else {
          reply
            .code(200)
            .header("Content-Type","text/html; charset=utf-8")
            .send(data)
         }
    });
});

//coin route
fastify.get("/coin",(request,reply)=>{
    const {denom = 0, count = 0} = request.query;
    let coin = {
        denom: parseInt(denom),
        count: parseInt(count)
    }
    let coinArr = [coin];
    let coinValue = coinCount(coinArr);
     reply
        .code(200)
        .header("Content-Type","text/html; charset=utf-8")
        .send(`<h2>Value of ${coin.count} of ${coin.denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
});


//Coins route with option
fastify.get("/coins",(request,reply)=>{
     const {option} = request.query;
    console.log(typeof(option))
    const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
    switch (option) {
        case '1':
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
            break;
        case '2':
            coinValue =coinCount(...coins); 
            break;
        case '3':
            coinValue = coinCount(coins);
        default:
            "0"
    }
     reply
        .code(200)
        .header("Content-Type","text/html; charset=utf-8")
        .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
});


//Start server and add fastify listen
const listenIP = 'localhost';
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err,address) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});