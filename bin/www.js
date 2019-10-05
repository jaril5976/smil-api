#!/usr/bin/env node

/**
 * Module dependencies.
 */
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');
const app = require('../app');
const http = require('http');

// Get port from environment and store in Express.
const ENV_SERVER_PORT = normalizePort(process.env.PORT || process.env.SERVER_PORT || '8080');
const ENV_SERVER_ADDRESS = process.env.SERVER_ADDRESS;

app.set('port', ENV_SERVER_PORT);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port
if (ENV_SERVER_ADDRESS){
  server.listen(ENV_SERVER_PORT, ENV_SERVER_ADDRESS);
}else{
  server.listen(ENV_SERVER_PORT);
}


server.on('error', onError);
server.on('listening', function(){
  const addr = server.address();
  if (typeof addr === 'string'){
    console.log('Listening on: pipe ' + addr);
  }else{
    console.log('Server Port: ' + addr.port);
    console.log('Server Address: ' + addr.address);
  }
  
});

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  const port = parseInt(val, 10); 

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
} 


// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof ENV_SERVER_PORT === 'string'
    ? 'Pipe ' + ENV_SERVER_PORT
    : 'Port ' + ENV_SERVER_PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}