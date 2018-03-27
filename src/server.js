const mqtt = require("mqtt")
// import MessageForm from "./component/MessageForm"
// import MessageList from "./component/MessageList"
const app = require('express')();
const http = require('http').Server(app);
const server = require('http').createServer();

const io = require('socket.io')(8080, {
  path: '',
  serveClient: false,
  // below are engine.IO options
  pingTimeout: 5000,
  cookie: false
});


io.on('connection', function(socket){
  socket.on('accel',function (message) {
    console.log(message)
  })
});


let client = mqtt.connect({
  host: 'localhost',
  port: 1883,
  connectTimeout: 5000
 });
console.log("aze")
client.on('connect', function () {
  client.subscribe('accel');
});

client.on('message', function (topic, message) {
  console.log(topic);
  console.log(message.toString('utf-8'));
  io.emit('accel', message.toString());
});
