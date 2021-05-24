'use strict';
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { EtherPortClient } = require('etherport-client');
const five = require('johnny-five');
const board = new five.Board({
    port: new EtherPortClient({
        host: '192.168.1.113',
        port: 3030
    }),
    repl: false
});



board.on('ready', function() {
    board.pinMode(13,1);
    console.log('Tarjeta Lista')
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

  
io.on('connection', (socket) => {
    socket.on('toggle',()=>{
        if(board.isReady){
            
            let toogle = board.pins['13'].value? 0 : 1;
            board.digitalWrite(13,toogle);
        }
    })
});
  



server.listen(3000, () => {
    console.log('listening on port :3000');
});