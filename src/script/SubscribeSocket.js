import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8080');

function subscribeToTimer(cb,updateStorage) {
  socket.on('accel', function (result) {
    cb(null, result)
    updateStorage(result)
  })
}

export { subscribeToTimer };
